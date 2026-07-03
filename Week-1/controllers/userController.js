import { users } from '../data/usersData.js';

export const getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: users
    });
};

export const getUserById = (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }

    res.status(200).json({
        status: 'success',
        data: user
    });
};

export const createUser = (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            status: 'error',
            message: 'Name is required'
        });
    }

    const newUser = {
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
        name: name
    };

    users.push(newUser);

    res.status(201).json({
        status: 'success',
        data: newUser
    });
};

export const updateUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const { name } = req.body;
    
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }

    if (!name) {
        return res.status(400).json({
            status: 'error',
            message: 'Name is required'
        });
    }

    users[userIndex].name = name;

    res.status(200).json({
        status: 'success',
        data: users[userIndex]
    });
};

export const deleteUser = (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({
            status: 'error',
            message: 'User not found'
        });
    }

    users.splice(userIndex, 1);

    res.status(204).send();
};
