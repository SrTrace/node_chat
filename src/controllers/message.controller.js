import { Message } from '../models/Message.model.js';
import { ChatUser } from '../models/ChatUser.model.js';
import { ApiError } from '../exceptions/api.error.js';

const getAllMessagesByRoomID = async (req, res) => {
  const { roomId } = req.params;

  if (isNaN(+roomId)) {
    throw ApiError.BadRequest('Invalid room ID');
  }

  const messages = await Message.findAll({
    where: { roomId },
  });

  const normalizedMessages = await Promise.all(
    messages.map(async (message) => {
      const user = await ChatUser.findOne({
        where: { id: message.userId },
        attributes: ['username'],
      });

      return normalizeMessage({
        id: message.id,
        userName: user ? user.username : 'anonymous',
        text: message.text,
        time: message.time,
      });
    }),
  );

  res.send(normalizedMessages);
};

const createMessageByRoomId = async (req, res) => {
  const { roomId } = req.params;
  const { userName, text } = req.body;

  if (!userName || !text.trim()) {
    throw ApiError.BadRequest('All fields required');
  }

  if (isNaN(+roomId)) {
    throw ApiError.BadRequest('Invalid room ID');
  }

  let existUser = await ChatUser.findOne({
    where: { username: userName },
  });

  if (!existUser) {
    existUser = await ChatUser.create({
      username: userName,
    });
  }

  const newMessage = await Message.create({
    userId: existUser.id,
    roomId,
    text,
  });

  res.status(201).json({
    message: 'Message created successfully',
    data: newMessage,
  });
};

function normalizeMessage({ id, userName, text, time }) {
  const dateString = time.toString();
  const trimmedDate = dateString.split(':').slice(0, 2).join(':');

  return {
    id,
    userName,
    text,
    time: trimmedDate,
  };
}

export const messageController = {
  getAllMessagesByRoomID,
  createMessageByRoomId,
};
