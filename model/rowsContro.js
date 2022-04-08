module.exports =  
    function rwos (data,res) {
        if (data.affectedRows === 1) {
            res.json({
                code: 0,
                msg: "执行成功"
            })
        } else {
            res.json({
                code: 1,
                msg: "执行失败"
            })
        }
    }
