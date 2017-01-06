function doGet(){
  return HtmlService.createHtmlOutputFromFile('index')
}

function verify() {
  var threads = GmailApp.search('is:unread from:(sony@email.sonyentertainmentnetwork.com) subject:Account Registration Confirmation');

  var expression = new RegExp('https?:\/\/account.sonyentertainmentnetwork.com\/liquid\/cam\/account\/email\/validate-email.action\?([^"]*)');
  
  threads.forEach(function(element) {
    var messages = element.getMessages();
    
    messages.forEach(function(message) {
      var body = message.getBody();
      var link = expression.exec(body);
      
      var request = UrlFetchApp.fetch(link);
      GmailApp.markMessageRead(message);
      //Uncomment to automatically move to trash
      //GmailApp.moveThreadToTrash(message);
    });
   
});
}