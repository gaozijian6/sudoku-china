// CloudKitManager.swift
import CloudKit

@objc(CloudKitManager)
class CloudKitManager: NSObject {
  private let container = CKContainer(identifier: "iCloud.sudokucustomChina")
  private let database = CKContainer(identifier: "iCloud.sudokucustomChina").privateCloudDatabase

  override init() {
    super.init()
    print("CloudKitManager initialized")
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
        NSLog("fetchData error: \(error.localizedDescription)")
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
    let recordID = CKRecord.ID(recordName: recordId)

    database.fetch(withRecordID: recordID) { (record, error) in
      if let error = error {
        rejecter("ERROR", error.localizedDescription, error)
        return
      }

      guard let record = record else {
        rejecter("ERROR", "未找到指定记录", nil)
        return
      }

      record.setValue(newData, forKey: "board")

      self.database.save(record) { (savedRecord, error) in
        if let error = error {
          rejecter("ERROR", error.localizedDescription, error)
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
