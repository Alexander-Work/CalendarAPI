# CalendarAPI
 
Email isn't being sent because I need oauth instead of username and password, google wont let me use basic authentication

I can use /calendar to get the entries into the data base using the email search option.. but date doesn't work despite me copying and pasting the exact date.

Update is working because it does not utilize the dates in this iteration. However a more user friendly version would use some form of grabbing the id with email and date to fetch it.

Delete is also working but... see above.

Quite lost on the date issue. Could be a series of formatting that needs to be done.

did not implement security.. 2 days late is more marks loss than implementing it.

# Below are the calls I was using

http://localhost:3000/api/deleteEvent/65729f98a958a5e97cf81b05

http://localhost:3000/api/updateEvent/6572954fcab71f54d0e08145
{ 
	"email": "alexanderpeebles3317@gmail.com",
	"date": "2023-12-31T18:00:00.000Z",
	"additionalRecipients": "alexanderpeebles@hotmail.com"
}

http://localhost:3000/api/createEvent
{
  "email": "deleteable2@hotmail.com",
	"date": "2023-12-31T18:00:00.000Z",
	"additionalRecipients": ["alexanderpeebles3317@gmail.com", "recipient2@example.com"]
}

# Not Working
http://localhost:3000/api/calendar?email=alexanderpeebles%40hotmail.com&date=2023-12-15T14%3A30%3A00.000Z

# Working
http://localhost:3000/api/calendar?email=alexanderpeebles%40hotmail.com