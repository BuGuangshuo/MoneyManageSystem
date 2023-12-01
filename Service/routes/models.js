/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-02-17 14:28:29
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-12 17:32:32
 * @FilePath: \MoneyNode\routes\models.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
var mongoose = require("mongoose");

const UserModel = mongoose.model(
  "users",
  new mongoose.Schema({
    username: String,
    password: String,
    infoname: String,
    level: Number,
    themeColor: String,
    layout: String,
    createTime: Number,
  })
);

const RoleModel = mongoose.model(
  "roles",
  new mongoose.Schema({
    role_type: Number,
    role_name: String,
    menu: [String],
  })
);

const MenuModel = mongoose.model(
  "menus",
  new mongoose.Schema({
    title: String,
    pagepermisson: Number,
    menu_id: Number,
    menu_key: String,
  })
);

const MenuChildrenModel = mongoose.model(
  "menu_childrens",
  new mongoose.Schema({
    title: String,
    menu_key: String,
    pagepermisson: Number,
    parent_id: Number,
  })
);

const FamilyModel = mongoose.model(
  "family",
  new mongoose.Schema({
    owerId: Object,
    familyName: String,
    createTime: Number,
    updateTime: Number,
  })
);

const GroupModel = mongoose.model(
  "groups",
  new mongoose.Schema({
    owerId: Object,
    groupName: String,
    groupId: String,
    imageUrl: String,
    isPublic: String,
    memo: String,
    memberCount: Number,
    createTime: Number,
    createUserName: String,
  })
);

const MemberModel = mongoose.model(
  "members",
  new mongoose.Schema({
    userName: String,
    infoName: String,
    groupName: String,
    groupId: String,
  })
);

const UserInfo = mongoose.model(
  "userInfo",
  new mongoose.Schema({
    userName: String,
    infoName: String,
    privinceData: String,
    secondCity: String,
    status: String,
    career: String,
    salary: Number,
    avaterSrc: String,
  })
);

const Approve = mongoose.model(
  "approves",
  new mongoose.Schema({
    userName: String,
    approveStatus: String,
    createTime: Number,
    approveTime: Number,
    approveUser: String,
    infoName: String,
    privinceData: String,
    secondCity: String,
    status: String,
    career: String,
    salary: Number,
    avaterSrc: String,
    rejectText: String,
    groupName: String,
    groupId: String,
  })
);

const Target = mongoose.model(
  "targets",
  new mongoose.Schema({
    targetName: String,
    amountVal: Number,
    currentCount: Number,
    dateValue: [String] || String,
    timeType: String,
    editType: String,
    createTime: Number,
    updateTime: Number,
    createUserName: String,
  })
);

module.exports = {
  UserModel,
  RoleModel,
  MenuModel,
  MenuChildrenModel,
  MemberModel,
  FamilyModel,
  GroupModel,
  UserInfo,
  Approve,
  Target,
};
