import authService from '../services/authService.js';

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await authService.register(name, email, password, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export default { register, login };
