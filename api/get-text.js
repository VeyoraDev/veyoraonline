// In-memory storage (reset setiap deploy)
let currentText = 'Veyora';

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ text: currentText });
}

export { currentText };
