const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("models");  // Import model User

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

exports.register = async (req, res) => {
  const { name, password, email} = req.body;
  const profileImage = 'https://images.unsplash.com/photo-1627372042956-94867aa1d129?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8MXgxfGVufDB8fDB8fHww'

  try {
    // Kiểm tra nếu user đã tồn tại
    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) {
      return res.status(400).json({ message: "name đã tồn tại" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email là bắt buộc" });
    }

    // Tạo user mới trong database
    const newUser = await User.create({
      name,
      password,
      email,
      profileImage
    });

    res.status(201).json({ message: "Đăng ký thành công" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};