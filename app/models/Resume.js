var Resume = Spine.Model.sub();
Resume.configure('Resume', 'personalData', 'objective', 'employments', 'skills', 'workExperiences');

Resume.extend(Spine.Model.Local);

Resume.extend({
    findSelf: function() {
                  var items ={};
                  var item = Resume.last();

                  if(item) {
                      return [item];
                  }

                  item = new Resume({
                      personalData: '',
                       objective: '',
                       employments: '',
                       skills: '',
                       workExperiences: ''
                  });

                  return [item];
              }
});
