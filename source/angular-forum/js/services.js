angular.module('myApp')
.factory('appFactory', function() {
  var service = {};
  service.data = [
    {  
      title: 'first title',
      content: 'first post',
      author: 'first author'
    },
    {  
      title: 'Second title',
      content: 'second post',
      author: 'second author'
    },
    {  
      title: 'Third title',
      content: 'third post',
      author: 'first author'
    }
  ];

      service.err = 'Please fill out all three';
  service.addData = function(t,c,a) {
    if(t && c && a) {
      service.data.push({title: t, content: c, author: a});
      service.err = '';
    } else {
      service.err = 'Please fill out all three';
    }
  };

  return service;
});
