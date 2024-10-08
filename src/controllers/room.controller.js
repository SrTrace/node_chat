import { ApiError } from '../exceptions/api.error.js';
import { Room } from '../models/Room.model.js';

const getAllRooms = async (req, res) => {
  const rooms = await Room.findAll();

  res.send(rooms.map(normolize));
};

const createRoom = async (req, res) => {
  const { name } = req.body;
  const existRoom = await Room.findOne({
    where: { name },
  });

  if (existRoom) {
    throw ApiError.BadRequest('Room already exist');
  }

  await Room.create({
    name,
  });

  res.status(201).send(`${name} was created`);
};

const renameRoom = async (req, res) => {
  const { roomId } = req.params;
  const { newName } = req.body;

  if (isNaN(+roomId)) {
    throw ApiError.BadRequest('Invalid room ID');
  }

  const existRoom = await Room.findByPk(+roomId);

  if (!existRoom) {
    throw ApiError.BadRequest('This room not existed');
  }

  existRoom.name = newName;
  existRoom.save();

  res.send(`Room was renamed to ${newName}`);
};

const removeRoom = async (req, res) => {
  const { roomId } = req.params;

  if (isNaN(+roomId)) {
    throw ApiError.BadRequest('Invalid room ID');
  }

  const existRoom = await Room.findByPk(+roomId);

  if (!existRoom) {
    throw ApiError.BadRequest('This room not existed');
  }

  await Room.destroy({
    where: { id: existRoom.id },
  });

  res.send(`The ${existRoom.name} room successfully deleted`);
};

function normolize({ id, name }) {
  return { id, name };
}

export const roomController = {
  getAllRooms,
  createRoom,
  renameRoom,
  removeRoom,
};
