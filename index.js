require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Pug engine dan folder views
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk file statis (CSS) dan parsing form data
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Konfigurasi Header Otorisasi HubSpot API menggunakan Private App Access Token
const getHubspotHeaders = () => {
    const token = process.env.PRIVATE_APP_ACCESS_TOKEN;
    if (!token || token === 'YOUR_HUBSPOT_PRIVATE_APP_TOKEN_HERE') {
        console.warn("⚠️ Peringatan: PRIVATE_APP_ACCESS_TOKEN belum dikonfigurasi dengan benar di berkas .env Anda!");
    }
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };
};

// ==============================================================================
// 1. ROUTE: GET "/" (Homepage) - Mengambil & Menampilkan Data Kontak CRM
// ==============================================================================
app.get('/', async (req, res) => {
    // Menggunakan objek standar 'contacts'
    const objectType = 'contacts';
    const url = `https://api.hubapi.com/crm/v3/objects/${objectType}`;
    
    // Properti standar kontak yang ingin kita ambil datanya (First Name, Last Name, Email)
    const params = {
        properties: 'firstname,lastname,email',
        limit: 100
    };

    try {
        console.log(`[GET] Mengambil data dari HubSpot Contacts...`);
        const response = await axios.get(url, { 
            headers: getHubspotHeaders(),
            params: params
        });
        
        const records = response.data.results || [];
        console.log(`[GET] Berhasil mengambil ${records.length} data kontak.`);

        res.render('homepage', {
            title: 'Contacts | HubSpot Integration Practicum',
            data: records
        });
    } catch (error) {
        console.error('❌ Error fetching contact records:', error.response ? error.response.data : error.message);
        
        res.render('homepage', {
            title: 'Error | HubSpot Integration Practicum',
            data: [],
            error: error.response ? JSON.stringify(error.response.data, null, 2) : error.message
        });
    }
});

// ==============================================================================
// 2. ROUTE: GET "/update-cobj" - Merender Form HTML untuk Menambahkan Kontak Baru
// ==============================================================================
app.get('/update-cobj', (req, res) => {
    // Perintah Praktikum: Judul halaman harus persis seperti di bawah ini meskipun menggunakan kontak
    res.render('updates', {
        title: 'Update Custom Object Form | Integrating With HubSpot I Practicum'
    });
});

// ==============================================================================
// 3. ROUTE: POST "/update-cobj" - Mengirim Data Form Baru ke API HubSpot
// ==============================================================================
app.post('/update-cobj', async (req, res) => {
    const objectType = 'contacts';
    const url = `https://api.hubapi.com/crm/v3/objects/${objectType}`;
    
    // Mengambil data dari body form input (firstname, lastname, email)
    const { firstname, lastname, email } = req.body;
    
    // Format payload API HubSpot CRM V3 untuk Kontak
    const newRecord = {
        properties: {
            firstname: firstname,
            lastname: lastname || '',
            email: email
        }
    };

    try {
        console.log(`[POST] Mengirimkan kontak baru ke HubSpot...`, newRecord);
        await axios.post(url, newRecord, {
            headers: getHubspotHeaders()
        });
        console.log('✅ Kontak baru berhasil ditambahkan.');
        
        // Perintah Praktikum: Melakukan redirect kembali ke homepage setelah berhasil
        res.redirect('/');
    } catch (error) {
        console.error('❌ Error creating contact record:', error.response ? error.response.data : error.message);
        res.status(500).send(`
            <h2>Gagal menambahkan data ke HubSpot</h2>
            <p>Error: ${error.response ? JSON.stringify(error.response.data) : error.message}</p>
            <a href="/update-cobj">Kembali ke formulir</a>
        `);
    }
});

// Jalankan server Express
app.listen(PORT, () => {
    console.log(`==============================================================================`);
    console.log(`🚀 Aplikasi HubSpot Practicum (Mode Kontak) berjalan di: http://localhost:${PORT}`);
    console.log(`📂 Folder Proyek: C:\\Users\\SatriyoUntoro\\Documents\\hubspot-practicum`);
    console.log(`==============================================================================`);
});
