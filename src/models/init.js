/* eslint-disable no-unused-vars */
import { client } from '../utils/db.js'; // Шлях до вашого клієнта
import { ChatUser } from './ChatUser.model.js';
import { Room } from './Room.model.js';
import { Message } from './Message.model.js';
import { setupAssociations } from './associations.js';

(async () => {
  try {
    // Синхронізація моделей
    await client.sync();
    // Можна використовувати { force: true } для пересинхронізації
    console.log('All models were synchronized successfully.');

    // Вставка тестових даних
    // const user = await ChatUser.create({ username: 'testUser0',});
    const room = await Room.create({ name: 'Test Room1' });
    const message = await Message.create({
      userId: 1,
      // roomId: 1,
      // userId: user.id,
      roomId: room.id,
      text: 'Hello, world444!',
    });

    console.log('Test data inserted successfully.');

    // Перевірка даних
    const messages = await Message.findAll();

    console.log('Messages:', JSON.stringify(messages, null, 2));
  } catch (error) {
    console.error('Error1:', error);
  } finally {
    // Закриття з'єднання
    await client.close(); // Переконайтеся, що з'єднання закривається
  }
})();
