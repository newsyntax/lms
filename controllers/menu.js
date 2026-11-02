const menuModel = require("../models/menu");

exports.getAll = async (req, res) => {
  const menus = await menuModel.find({}).lean();
  menus.forEach((menu) => {
    const submenus = [];
    for (let index = 0; index < menus.length; index++) {
      const mainMenu = menus[index];
      if (mainMenu.parent?.equals(menu._id)) {
        submenus.push(menus.splice(index, 1)[0]);
        index = index - 1;
      }
    }
    menu.submenus = submenus;
  });

  return res.json(menus);
};
exports.create = async (req, res) => {
  const { title, parent, href } = req.body;
  const menu = await menuModel.create({ title, parent, href });
  res.status(201).json(menu);
};
exports.getAllInPanel = async (req, res) => {
  const menu = await menuModel.find({}).populate("parent").lean();
  res.json(menu);
};
exports.remove = async (req, res) => {
  await menuModel.deleteOne({ _id: req.params.id });
  res.json({ message: "menu removed successfully" });
};
