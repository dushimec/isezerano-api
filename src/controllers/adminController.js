import User from '../models/userModel.js';

export const registerSecretary = async (req, res) => {
  try {
    const { phoneNumber, name } = req.body;
    const user = new User({ phoneNumber, name, role: 'Secretary', isVerified: true });
    await user.save();
    res.status(201).json({ message: 'Secretary registered successfully' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to register secretary' });
  }
};

export const registerDisciplinarian = async (req, res) => {
  try {
    const { phoneNumber, name } = req.body;
    const user = new User({ phoneNumber, name, role: 'Disciplinarian', isVerified: true });
    await user.save();
    res.status(201).json({ message: 'Disciplinarian registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register disciplinarian' });
  }
};
