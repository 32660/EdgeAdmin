Tea.context(function () {
	this.success = NotifyPopup

	this.group = {
		connector: "or",
		description: "",
		isReverse: false,
		conds: [],
		isOn: true
	}

	// 是否在修改
	this.$delay(function () {
		if (window.parent.UPDATING_COND_GROUP != null) {
			this.group = window.parent.UPDATING_COND_GROUP
		}
	})

	// 条件类型名称
	this.typeName = function (cond) {
		let c = this.components.$find(function (k, v) {
			return v.type == cond.type
		})
		if (c != null) {
			return c.name;
		}
		return cond.param + " " + cond.operator
	}

	// 添加条件
	this.addCond = function () {
		window.UPDATING_COND = null

		let that = this

		teaweb.popup("/servers/server/settings/conds/addCondPopup", {
			width: "32em",
			height: "22em",
			callback: function (resp) {
				that.group.conds.push(resp.data.cond)
			}
		})
	}

	// 删除条件
	this.removeCond = function (condIndex) {
		let that = this
		teaweb.confirm("确定要删除此条件？", function () {
			that.group.conds.$remove(condIndex)
		})
	}

	// 修改条件
	this.updateCond = function (condIndex, cond) {
		window.UPDATING_COND = cond
		let that = this

		teaweb.popup("/servers/server/settings/conds/addCondPopup", {
			width: "32em",
			height: "22em",
			callback: function (resp) {
				that.group.conds[condIndex] = resp.data.cond
			}
		})
	}
})