// CloudKitManager.swift
import CloudKit
import React

@objc(CloudKitManager)
class CloudKitManager: NSObject {
  private let container = CKContainer(identifier: "iCloud.sudokucustomChina")
  private let database = CKContainer(identifier: "iCloud.sudokucustomChina").privateCloudDatabase

  override init() {
    super.init()
  }

  @objc
  func saveData(
    _ data: String,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    let record = CKRecord(recordType: "myBoards")
    record.setValue(data, forKey: "board")
    record.setValue(Date(), forKey: "createdAt")

    database.save(record) { (savedRecord, error) in
      if let error = error {
        rejecter("ERROR", error.localizedDescription, error)
        return
      }

      if let recordName = savedRecord?.recordID.recordName {
        resolver(["id": recordName])
      } else {
        rejecter("ERROR", "无法获取记录ID", nil)
      }
    }
  }

  @objc
  func fetchData(
    _ record: String,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    let query = CKQuery(recordType: "myBoards", predicate: NSPredicate(value: true))
    query.sortDescriptors = [NSSortDescriptor(key: "createdAt", ascending: false)]

    database.perform(query, inZoneWith: nil) { (records, error) in
      if let error = error {
        rejecter("ERROR", error.localizedDescription, error)
        return
      }

      guard let records = records else {
        resolver([])
        return
      }

      let boardsData = records.compactMap { record -> [String: Any]? in
        guard let board = record["board"] as? String else { return nil }
        return [
          "id": record.recordID.recordName,
          "data": board,
        ]
      }

      resolver(boardsData)
    }
  }

  @objc
  func deleteData(
    _ recordIds: NSArray,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {

    // 将记录ID转换为CKRecord.ID数组
    let recordIDs = recordIds.compactMap { id -> CKRecord.ID? in
      guard let idString = id as? String else { return nil }
      return CKRecord.ID(recordName: idString)
    }

    // 创建批量删除操作
    let operation = CKModifyRecordsOperation(recordsToSave: nil, recordIDsToDelete: recordIDs)

    // 配置操作
    operation.qualityOfService = .userInitiated
    operation.modifyRecordsCompletionBlock = { savedRecords, deletedRecordIDs, error in
      if let error = error {
        rejecter("ERROR", error.localizedDescription, error)
        return
      }

      resolver([
        "success": true,
        "deletedCount": deletedRecordIDs?.count ?? 0,
      ])
    }

    // 执行操作
    database.add(operation)
  }

  @objc
  func updateData(
    _ recordId: String,
    newData: String,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    updateDataWithRetry(recordId, newData: newData, retryCount: 0, resolver: resolver, rejecter: rejecter)
  }

  private func updateDataWithRetry(
    _ recordId: String,
    newData: String,
    retryCount: Int,
    resolver: @escaping RCTPromiseResolveBlock,
    rejecter: @escaping RCTPromiseRejectBlock
  ) {
    let recordID = CKRecord.ID(recordName: recordId)
    
    // 首先获取最新的记录
    database.fetch(withRecordID: recordID) { (record, error) in
      if let error = error {
        if retryCount < 3 {
          // 如果获取失败，重试
          DispatchQueue.main.asyncAfter(deadline: .now() + Double(retryCount + 1)) {
            self.updateDataWithRetry(recordId, newData: newData, retryCount: retryCount + 1, resolver: resolver, rejecter: rejecter)
          }
          return
        }
        rejecter("FETCH_ERROR", error.localizedDescription, error)
        return
      }
      
      guard let record = record else {
        rejecter("RECORD_NOT_FOUND", "未找到指定记录", nil)
        return
      }
      
      // 更新记录数据
      record.setValue(newData, forKey: "board")
      record.setValue(Date(), forKey: "updatedAt") // 添加更新时间戳
      
      // 保存记录
      self.database.save(record) { (savedRecord, error) in
        if let error = error as? CKError {
          // 处理特定的CloudKit错误
          switch error.code {
          case .serverRecordChanged:
            // 记录在服务器上已被修改，需要处理冲突
            if retryCount < 3 {
              DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                self.updateDataWithRetry(recordId, newData: newData, retryCount: retryCount + 1, resolver: resolver, rejecter: rejecter)
              }
              return
            }
            rejecter("CONFLICT_ERROR", "记录更新冲突，请重试", error)
          case .quotaExceeded:
            rejecter("QUOTA_ERROR", "iCloud存储空间不足", error)
          case .networkUnavailable, .networkFailure:
            rejecter("NETWORK_ERROR", "网络连接失败", error)
          default:
            if retryCount < 3 {
              DispatchQueue.main.asyncAfter(deadline: .now() + Double(retryCount + 1) * 0.5) {
                self.updateDataWithRetry(recordId, newData: newData, retryCount: retryCount + 1, resolver: resolver, rejecter: rejecter)
              }
              return
            }
            rejecter("UPDATE_ERROR", error.localizedDescription, error)
          }
          return
        }
        
        resolver([
          "success": true,
          "id": savedRecord?.recordID.recordName ?? recordId,
        ])
      }
    }
  }
}
