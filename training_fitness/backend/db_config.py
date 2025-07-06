import cx_Oracle

def get_db_connection():
    dsn = cx_Oracle.makedsn('localhost', 1521, service_name='XE')
    conn = cx_Oracle.connect(user='your_username', password='your_password', dsn=dsn)
    return conn
# Replace 'your_username' and 'your_password' with your actual Oracle database credentials.