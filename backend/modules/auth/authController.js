const jwt = require("jsonwebtoken");
const { User } = require("models");  // Import model User
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10; // Số vòng băm mật khẩu

const generateToken = (user) => {
  return jwt.sign({ id: user.id, name: user.name }, "secretKey", { expiresIn: "1h" });
};

exports.login = async (req, res) => {
  const { name, password } = req.body;
  // Kiểm tra xem name và password có tồn tại hay không
  if (!name || !password) {
    return res.status(400).json({ message: "Tên đăng nhập và mật khẩu là bắt buộc." });
  }

  try {
    // Tìm user trong database
    const user = await User.findOne({ where: { name } });

    // Kiểm tra nếu user không tồn tại hoặc mật khẩu không đúng
    if (!user || password != user.password) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginAdmin = async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: "Tên đăng nhập và mật khẩu là bắt buộc." });
  }

  try {
    // Tìm user trong database
    const user = await User.findOne({ where: { name } });

    // Kiểm tra nếu user không tồn tại
    if (!user) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }
    if (user.active != 1) {
      return res.status(401).json({message: "Tài khoản chưa kích hoạt"})
    }
    if (user.role_id != 1) {
      return res.status(401).json({message: "Không có quyền admin"})
    }

    // So sánh mật khẩu đã nhập với mật khẩu đã băm trong database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.register = async (req, res) => {
  const { name, password, email } = req.body;
  const profileImage =
    "https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-avatar-hoat-hinh-de-thuong-xinh-xan.jpg?1704788263223";

  try {
    // Kiểm tra nếu user đã tồn tại
    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email là bắt buộc" });
    }

    // Băm mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const role_id = 3;

    // Tạo user mới trong database
    const newUser = await User.create({
      name,
      password: hashedPassword, // Lưu mật khẩu đã băm
      email,
      profileImage,
      role_id
    });

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.registerAdmin = async (req, res) => {
  const { name, password, email } = req.body;
  const profileImage =
    "https://images.unsplash.com/photo-1627372042956-94867aa1d129?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8MXgxfGVufDB8fDB8fHww";

  try {
    // Kiểm tra nếu user đã tồn tại
    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) {
      return res.status(400).json({ message: "Tên đăng nhập đã tồn tại" });
    }
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: "Email đăng nhập đã tồn tại" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email là bắt buộc" });
    }

    // Băm mật khẩu trước khi lưu
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const role_id = 1;
    const active = 0;

    // Tạo user mới trong database
    const newUser = await User.create({
      name,
      password: hashedPassword, // Lưu mật khẩu đã băm
      email,
      profileImage,
      role_id,
      active
    });

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};