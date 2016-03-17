import pymongo

#gets you the handler on the mongo client
client = pymongo.MongoClient()
#choose the data base
db = client.Surveys
#choose the collection
collection = db.usersurveystemp

#insert data
def insertData(username, email, surveyResponse):
	collection.insert_one({
		'user': username, 
		'email': email, 
		'color': surveyResponse['color'], 
		'food': surveyResponse['food'], 
		'vacation': surveyResponse['vacation'], 
		'fe-before': surveyResponse['fe-before'], 
		'fe-after': surveyResponse['fe-after'], 
		'comment': surveyResponse['comment'], 
		'pet': surveyResponse['pet']
		})

#average before values
def aggregateBeforeValues():
	before = list(collection.find({}, {"fe-before":1, "_id":0}))
	beforeSum = 0
	for i in before:
		beforeSum = beforeSum + float(i['fe-before']);
	return round(beforeSum / len(before), 2)

#average after values
def aggregateAfterValues():
	after = list(collection.find({}, {"fe-after":1, "_id":0}))
	afterSum = 0
	for j in after:
		afterSum = afterSum + float(j['fe-after']);
	return round(afterSum / len(after), 2)

#get total response count
def getTotalResponseCount():
	return collection.count()