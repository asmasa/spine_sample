var Employment = Spine.Model.sub();
Employment.configure('Employment', 'company', 'firstDate', 'lastDate', 'businessLineup', 'capital', 'employees');

Employment.extend(Spine.Model.Local);

Employment.extend({
    findSingleton: function() {
                   }
});
