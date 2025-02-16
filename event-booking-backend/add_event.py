import booking_dao

admin_credentials = [{'email':'vamsi.preetham.140@gmail.com', 'password':'7702025635'}]

def adminlogin(data):
    print(data)
    for cred in admin_credentials:
        print(cred)
        if cred['email'] == data['email'] and cred['password'] == data['password']:
            return True
    return False


def addevent(data):
    return booking_dao.add_event(data)
