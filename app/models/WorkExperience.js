var WorkExperience = Spine.Model.setup();
WorkExperience.configure('WorkExperience', 'title', 'fromDate', 'toDate', 'content', 'process', 'role', 'manMonth', 'number', 'useTech');

WorkExperience.extend(Spine.Model.Local);
