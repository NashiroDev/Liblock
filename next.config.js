/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        'MYSQL_HOST': '127.0.0.1',
        'MYSQL_PORT': '3306',
        'MYSQL_DATABASE': 'liblock',
        'MYSQL_USER': 'Nashiro',
        'MYSQL_PASSWORD': '',
    }
}

module.exports = nextConfig
