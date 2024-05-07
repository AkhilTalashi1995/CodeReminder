from leetscrape import GetQuestionsList

ls = GetQuestionsList()
ls.scrape() # Scrape the list of questions
print(ls.questions.head()) # Get the list of questions