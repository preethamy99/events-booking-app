from datetime import datetime
import category


time_slots = [
    { 'date': '2025-02-15', 'category': 'Cat 1', 'slots': ['09:00', '11:00', '13:00', '15:00'], 'subscribed': [] },
    { 'date': '2025-02-16', 'category': 'Cat 1', 'slots': ['09:00', '11:00', '13:00', '15:00'], 'subscribed': [] },
    { 'date': '2025-02-17', 'category': 'Cat 1', 'slots': ['09:00', '11:00', '13:00', '15:00'], 'subscribed': [] },
    { 'date': '2025-02-18', 'category': 'Cat 1', 'slots': ['09:00', '11:00', '13:00', '15:00'], 'subscribed': [] },
    { 'date': '2025-02-19', 'category': 'Cat 1', 'slots': ['09:00', '11:00', '13:00', '15:00'], 'subscribed': [] },
    { 'date': '2025-02-20', 'category': 'Cat 1', 'slots': ['09:00', '11:00', '13:00', '15:00'], 'subscribed': [] },
    { 'date': '2025-02-21', 'category': 'Cat 1', 'slots': ['09:00', '11:00', '13:00', '15:00'], 'subscribed': [] },
    { 'date': '2025-02-15', 'category': 'Cat 2', 'slots': ['10:00', '12:00', '14:00'], 'subscribed': [] },
    { 'date': '2025-02-16', 'category': 'Cat 2', 'slots': ['10:00', '12:00', '14:00'], 'subscribed': [] },
    { 'date': '2025-02-17', 'category': 'Cat 2', 'slots': ['10:00', '12:00', '14:00'], 'subscribed': [] },
    { 'date': '2025-02-18', 'category': 'Cat 2', 'slots': ['10:00', '12:00', '14:00'], 'subscribed': [] },
    { 'date': '2025-02-19', 'category': 'Cat 2', 'slots': ['10:00', '12:00', '14:00'], 'subscribed': [] },
    { 'date': '2025-02-20', 'category': 'Cat 2', 'slots': ['10:00', '12:00', '14:00'], 'subscribed': [] },
    { 'date': '2025-02-21', 'category': 'Cat 2', 'slots': ['10:00', '12:00', '14:00'], 'subscribed': [] },
    { 'date': '2025-02-15', 'category': 'Cat 3', 'slots': ['08:00', '10:00', '12:00', '14:00'], 'subscribed': [] },
    { 'date': '2025-02-16', 'category': 'Cat 3', 'slots': ['08:00', '10:00', '12:00', '14:00'], 'subscribed': [] },
    { 'date': '2025-02-17', 'category': 'Cat 3', 'slots': ['08:00', '10:00', '12:00', '14:00'], 'subscribed': [] },
    { 'date': '2025-02-18', 'category': 'Cat 3', 'slots': ['08:00', '10:00', '12:00', '14:00'], 'subscribed': [] },
    { 'date': '2025-02-19', 'category': 'Cat 3', 'slots': ['08:00', '10:00', '12:00', '14:00'], 'subscribed': [] },
    { 'date': '2025-02-20', 'category': 'Cat 3', 'slots': ['08:00', '10:00', '12:00', '14:00'], 'subscribed': [] },
    { 'date': '2025-02-21', 'category': 'Cat 3', 'slots': ['08:00', '10:00', '12:00', '14:00'], 'subscribed': [] },
]

bookings = {}

def book_event(data):
    for book in bookings:
        if data == bookings[book]:
            return 
    n = len(bookings)
    bookings[n + 1] = data
    return bookings


def unsubscribe_event(data):
    for book in bookings:
        if data == bookings[book]:
            bookings[book] = '' 


def add_event(data):
    if data['category'] not in category.get_all_category() and data['date'] < datetime.now():
        return 'Category not available'
    for s in time_slots:
        if data['category'] == s['category'] and data['date'] == s['date']:
            for j in data['slot']:
                if j in s['slots']:
                    return False
        elif data['date'] == s['date']:
            for j in data['slots']:
                s['slots'].append(data['slots'])
            return True
    return False


def getslots(data):
    for slot in time_slots:
          if data['date'] == slot['date'] and data['category'] == slot['category']:
            return slot['slots']
    return []

