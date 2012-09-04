var PersonalData = Spine.Model.sub();
PersonalData.configure('PersonalData', 
        'firstName', 'lastName', 'birthday', 'gender');

PersonalData.extend(Spine.Model.Local);

PersonalData.extend({
    findSelf: function() {
                  var items ={};
                  var item = PersonalData.last();

                  if(item) {
                      return [item];
                  }

                  item = new PersonalData({
                      firstName: '',
                       lastName: '',
                       birthday: '',
                       gender: ''
                  });

                  return [item];
              }
});

PersonalData.include({
    age: function() {
             var now = new Date();
             now = now.getFullYear()*10000 + now.getMonth()*100 + 100 + now.getDate();
             if(!this.birthday) {
                 return '';
             }

             var old = this.birthday;
             old = parseInt(old.replace(/\//g, ''));

             return (Math.floor((now - old) / 10000));
         },

    fullName: function() {
                  if(!this.firstName && !this.lastName) {
                      return '';
                  }
                  if(!this.firstName) {
                      return this.lastName;
                  }
                  if(!this.lastName) {
                      return this.firstName;
                  }
                  return (this.lastName + ' ' + this.firstName);
              }
});
