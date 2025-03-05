import Foundation

struct Plan {
    var i: Int
    var j: Int
    var val: Int
}

@objc(Solver)
class DLX: NSObject, RCTBridgeModule {
    // 添加这个静态属性来实现 RCTBridgeModule 协议
    static func moduleName() -> String! {
        return "Solver"
    }

    // 添加这个静态属性来指定是否应该在主线程初始化
    static func requiresMainQueueSetup() -> Bool {
        return false
    }

    private let maxn = 20010
    private var L: [Int]
    private var R: [Int]
    private var D: [Int]
    private var U: [Int]
    private var Row: [Int]
    private var C: [Int]
    private var S: [Int]
    private var m: Int
    private var id: Int
    private var rowid: Int
    private var ans: [Int]
    private var cnt: Int
    private var mul: Int
    private var res: [[Int]]
    private var p: [Plan]

    override init() {
        self.L = Array(repeating: 0, count: maxn)
        self.R = Array(repeating: 0, count: maxn)
        self.D = Array(repeating: 0, count: maxn)
        self.U = Array(repeating: 0, count: maxn)
        self.Row = Array(repeating: 0, count: maxn)
        self.C = Array(repeating: 0, count: maxn)
        self.S = Array(repeating: 0, count: maxn)
        self.ans = Array(repeating: 0, count: maxn)
        self.m = 0
        self.id = 0
        self.rowid = 0
        self.cnt = 0
        self.mul = 0
        self.res = Array(repeating: Array(repeating: 0, count: 20), count: 20)
        self.p = Array(repeating: Plan(i: 0, j: 0, val: 0), count: 5010)
        super.init()
    }

    @objc func initDLX(_ m: Int) {
        self.m = m
        self.mul = 0

        for i in 0...m {
            D[i] = i
            U[i] = i
            S[i] = 0
            L[i] = i - 1
            R[i] = i + 1
        }

        L[0] = m
        R[m] = 0
        id = m + 1
        cnt = 0
        rowid = 0
    }

    func insert(_ arr: [Int], _ len: Int) {
        for i in 0..<len {
            let x = arr[i]
            C[id] = x
            Row[id] = rowid
            S[x] += 1
            D[id] = x
            U[id] = U[x]
            D[U[x]] = id
            U[x] = id

            if i == 0 {
                L[id] = id
                R[id] = id
            } else {
                L[id] = id - 1
                R[id] = id - i
                L[id - i] = id
                R[id - 1] = id
            }
            id += 1
        }
        rowid += 1
    }

    private func remove(_ c: Int) {
        L[R[c]] = L[c]
        R[L[c]] = R[c]

        var i = D[c]
        while i != c {
            var j = R[i]
            while j != i {
                S[C[j]] -= 1
                U[D[j]] = U[j]
                D[U[j]] = D[j]
                j = R[j]
            }
            i = D[i]
        }
    }

    private func resume(_ c: Int) {
        var i = U[c]
        while i != c {
            var j = L[i]
            while j != i {
                S[C[j]] += 1
                U[D[j]] = j
                D[U[j]] = j
                j = L[j]
            }
            i = U[i]
        }
        L[R[c]] = c
        R[L[c]] = c
    }

    func dance() -> Bool {
        if R[0] == 0 {
            mul += 1
            if mul > 1 {
                return true
            }
            for i in 0..<cnt {
                let plan = p[ans[i]]
                res[plan.i][plan.j] = plan.val
            }
            return false
        }

        var c = R[0]
        var i = R[0]
        while i != 0 {
            if S[i] < S[c] {
                c = i
            }
            i = R[i]
        }

        remove(c)
        i = D[c]
        while i != c {
            ans[cnt] = Row[i]
            cnt += 1

            var j = R[i]
            while j != i {
                remove(C[j])
                j = R[j]
            }

            if dance() {
                return true
            }

            j = L[i]
            while j != i {
                resume(C[j])
                j = L[j]
            }

            cnt -= 1
            i = D[i]
        }
        resume(c)
        return false
    }

    @objc func getResult() -> [[Int]] {
        return res
    }

    @objc func getMul() -> Int {
        return mul
    }

    func setPlan(_ index: Int, _ plan: Plan) {
        p[index] = plan
    }

    @objc func solveSudoku(_ input: String) -> String {
        let m = 3
        let size = m * m
        let dlx = DLX()

        // 计算宫格编号的辅助函数
        func grid(_ i: Int, _ j: Int) -> Int {
            return ((i - 1) / m) * m + ((j - 1) / m) + 1
        }

        // 将输入字符串转换为二维数组
        var map = Array(repeating: Array(repeating: 0, count: 20), count: 20)
        for i in 0..<size {
            for j in 0..<size {
                if let val = Int(
                    String(input[input.index(input.startIndex, offsetBy: i * size + j)]))
                {
                    map[i + 1][j + 1] = val
                }
            }
        }

        let M = size
        dlx.initDLX(M * M * 4)
        var idx = 0

        // 构建精确覆盖问题
        for i in 1...M {
            for j in 1...M {
                if map[i][j] != 0 {
                    let k = map[i][j]
                    let arr = [
                        (i - 1) * M + k,
                        M * M + (j - 1) * M + k,
                        M * M * 2 + (grid(i, j) - 1) * M + k,
                        M * M * 3 + (i - 1) * M + j,
                    ]
                    dlx.insert(arr, 4)
                    dlx.setPlan(idx, Plan(i: i - 1, j: j - 1, val: k))
                    idx += 1
                } else {
                    for k in 1...M {
                        let arr = [
                            (i - 1) * M + k,
                            M * M + (j - 1) * M + k,
                            M * M * 2 + (grid(i, j) - 1) * M + k,
                            M * M * 3 + (i - 1) * M + j,
                        ]
                        dlx.insert(arr, 4)
                        dlx.setPlan(idx, Plan(i: i - 1, j: j - 1, val: k))
                        idx += 1
                    }
                }
            }
        }

        _ = dlx.dance()
        let result = dlx.getResult()

        // 将结果转换为字符串
        var output = ""
        for i in 0..<size {
            for j in 0..<size {
                output += String(result[i][j])
            }
        }
        return output
    }

    @objc func solveSudokuReverse(_ input: String) -> String {
        let m = 3
        let size = m * m
        let dlx = DLX()

        // 计算宫格编号的辅助函数
        func grid(_ i: Int, _ j: Int) -> Int {
            return ((i - 1) / m) * m + ((j - 1) / m) + 1
        }

        // 将输入字符串转换为二维数组
        var map = Array(repeating: Array(repeating: 0, count: 20), count: 20)
        for i in 0..<size {
            for j in 0..<size {
                if let val = Int(
                    String(input[input.index(input.startIndex, offsetBy: i * size + j)]))
                {
                    map[i + 1][j + 1] = val
                }
            }
        }

        let M = size
        dlx.initDLX(M * M * 4)
        var idx = 0

        // 从右下角开始构建精确覆盖问题
        for i in stride(from: M, through: 1, by: -1) {
            for j in stride(from: M, through: 1, by: -1) {
                if map[i][j] != 0 {
                    let k = map[i][j]
                    let arr = [
                        (i - 1) * M + k,
                        M * M + (j - 1) * M + k,
                        M * M * 2 + (grid(i, j) - 1) * M + k,
                        M * M * 3 + (i - 1) * M + j,
                    ]
                    dlx.insert(arr, 4)
                    dlx.setPlan(idx, Plan(i: i - 1, j: j - 1, val: k))
                    idx += 1
                } else {
                    // 从9到1反向尝试数字
                    for k in stride(from: M, through: 1, by: -1) {
                        let arr = [
                            (i - 1) * M + k,
                            M * M + (j - 1) * M + k,
                            M * M * 2 + (grid(i, j) - 1) * M + k,
                            M * M * 3 + (i - 1) * M + j,
                        ]
                        dlx.insert(arr, 4)
                        dlx.setPlan(idx, Plan(i: i - 1, j: j - 1, val: k))
                        idx += 1
                    }
                }
            }
        }

        _ = dlx.dance()
        let result = dlx.getResult()

        // 将结果转换为字符串
        var output = ""
        for i in 0..<size {
            for j in 0..<size {
                output += String(result[i][j])
            }
        }
        return output
    }

    @objc(solve:resolver:rejecter:)
    func solve(
        _ input: String,
        resolver: @escaping RCTPromiseResolveBlock,
        rejecter: @escaping RCTPromiseRejectBlock
    ) {
        let queue = DispatchQueue.global()
        let group = DispatchGroup()
        let invalidSolution =
            "000000000000000000000000000000000000000000000000000000000000000000000000000000000"

        // 用于线程安全地存储和访问结果
        let lock = NSLock()
        var solution1: String?
        var solution2: String?
        var hasResolved = false

        // 检查解是否有效并处理结果
        func checkAndResolve(_ sol: String, _ isFirstSolution: Bool) {
            lock.lock()
            defer { lock.unlock() }

            if hasResolved {
                return
            }

            if sol == invalidSolution {
                hasResolved = true
                resolver("null")
                return
            }

            if isFirstSolution {
                solution1 = sol
                if let sol2 = solution2 {
                    hasResolved = true
                    resolver(sol == sol2 ? sol : "null")
                }
            } else {
                solution2 = sol
                if let sol1 = solution1 {
                    hasResolved = true
                    resolver(sol == sol1 ? sol : "null")
                }
            }
        }

        // 并行执行正向解法
        queue.async(group: group) {
            let sol1 = self.solveSudoku(input)
            checkAndResolve(sol1, true)
        }

        // 并行执行反向解法
        queue.async(group: group) {
            let sol2 = self.solveSudokuReverse(input)
            checkAndResolve(sol2, false)
        }

        // 等待所有任务完成（以防万一都没有触发resolver）
        group.notify(queue: .main) {
            lock.lock()
            defer { lock.unlock() }

            if !hasResolved {
                resolver("null")
            }
        }
    }
}
