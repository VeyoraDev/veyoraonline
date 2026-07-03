import { currentText } from './get-text.js';

const TOKEN = '8988555855:AAE8HoautR88vyCxvXYoFZ2Yz1lz04dP90c';
const OWNER_ID = '1086203403';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const { message } = req.body;
    if (!message || !message.text) {
        return res.status(200).send('OK');
    }

    const chatId = message.chat.id;
    const text = message.text.trim();

    if (String(chatId) !== OWNER_ID) {
        await sendMessage(chatId, '❌ Lu bukan owner, bro!');
        return res.status(200).send('OK');
    }

    if (text.startsWith('/set ')) {
        const newText = text.replace('/set ', '').trim();
        if (newText.length === 0) {
            await sendMessage(chatId, '❌ Isi teksnya jangan kosong, bro!');
            return res.status(200).send('OK');
        }

        currentText = newText;
        await sendMessage(chatId, `✅ Teks berhasil diubah jadi: "${newText}"`);
        return res.status(200).send('OK');
    }

    await sendMessage(chatId, 
        `🤖 Bot Veyora\n` +
        `Gunakan:\n` +
        `/set <teks> → ganti tulisan di web\n` +
        `Contoh: /set VeyoraX`
    );
    res.status(200).send('OK');
}

async function sendMessage(chatId, text) {
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text })
    });
}
