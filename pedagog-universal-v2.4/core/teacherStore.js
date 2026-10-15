(function () {
  'use strict';

  var CLASSES_KEY = 'ped_classes_v3';
  var STUDENTS_KEY = 'ped_students_v3';
  var GRADES_KEY = 'ped_grades_v3';
  var NOTES_KEY = 'ped_notes_v3';
  var TASKS_KEY = 'ped_tasks_v3';

  function load(key, def) {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(def));
    } catch (e) {
      return def;
    }
  }
  function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }
  function uid(prefix) {
    return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
  }

  window.PED_TEACHER = {
    // ═══════════════ КЛАССЫ ═══════════════
    getClasses: function () { return load(CLASSES_KEY, []); },
    addClass: function (data) {
      var list = window.PED_TEACHER.getClasses();
      var c = {
        id: uid('cls'),
        name: data.name || '',
        subject: data.subject || '',
        year: data.year || new Date().getFullYear(),
        students: data.students || 0,
        schedule: data.schedule || '',
        createdAt: new Date().toISOString()
      };
      list.push(c);
      save(CLASSES_KEY, list);
      return c;
    },
    removeClass: function (id) {
      var list = window.PED_TEACHER.getClasses().filter(function (c) { return c.id !== id; });
      save(CLASSES_KEY, list);
      // Удаляем оценки этого класса
      var grades = window.PED_TEACHER.getGrades().filter(function (g) { return g.classId !== id; });
      save(GRADES_KEY, grades);
      return true;
    },
    getClass: function (id) {
      return window.PED_TEACHER.getClasses().find(function (c) { return c.id === id; }) || null;
    },

    // ═══════════════ УЧЕНИКИ ═══════════════
    getStudents: function () { return load(STUDENTS_KEY, []); },
    getStudentsByClass: function (classId) {
      return window.PED_TEACHER.getStudents().filter(function (s) { return s.classId === classId; });
    },
    addStudent: function (data) {
      var list = window.PED_TEACHER.getStudents();
      var s = {
        id: uid('std'),
        classId: data.classId || '',
        name: data.name || '',
        note: data.note || '',
        parentContact: data.parentContact || '',
        createdAt: new Date().toISOString()
      };
      list.push(s);
      save(STUDENTS_KEY, list);
      return s;
    },
    removeStudent: function (id) {
      var list = window.PED_TEACHER.getStudents().filter(function (s) { return s.id !== id; });
      save(STUDENTS_KEY, list);
      return true;
    },
    getStudent: function (id) {
      return window.PED_TEACHER.getStudents().find(function (s) { return s.id === id; }) || null;
    },

    // ═══════════════ ОЦЕНКИ ═══════════════
    getGrades: function () { return load(GRADES_KEY, []); },
    addGrade: function (data) {
      var list = window.PED_TEACHER.getGrades();
      var g = {
        id: uid('grd'),
        studentId: data.studentId,
        classId: data.classId,
        grade: parseInt(data.grade) || 0,
        weight: parseInt(data.weight) || 1, // 1 = обычная, 2 = контрольная
        comment: data.comment || '',
        date: data.date || new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      };
      list.push(g);
      save(GRADES_KEY, list);
      return g;
    },
    removeGrade: function (id) {
      var list = window.PED_TEACHER.getGrades().filter(function (g) { return g.id !== id; });
      save(GRADES_KEY, list);
      return true;
    },
    getGradesByStudent: function (studentId) {
      return window.PED_TEACHER.getGrades().filter(function (g) { return g.studentId === studentId; });
    },
    getAverageForStudent: function (studentId) {
      var grades = window.PED_TEACHER.getGradesByStudent(studentId);
      if (!grades.length) return null;
      var sum = 0, totalWeight = 0;
      grades.forEach(function (g) {
        sum += g.grade * g.weight;
        totalWeight += g.weight;
      });
      return (sum / totalWeight).toFixed(2);
    },

    // ═══════════════ ЗАМЕТКИ ═══════════════
    getNotes: function () { return load(NOTES_KEY, []); },
    addNote: function (data) {
      var list = window.PED_TEACHER.getNotes();
      var n = {
        id: uid('note'),
        classId: data.classId || '',
        studentId: data.studentId || '',
        title: data.title || '',
        text: data.text || '',
        category: data.category || 'obs', // obs, parent, idea, problem
        date: new Date().toISOString()
      };
      list.push(n);
      save(NOTES_KEY, list);
      return n;
    },
    removeNote: function (id) {
      var list = window.PED_TEACHER.getNotes().filter(function (n) { return n.id !== id; });
      save(NOTES_KEY, list);
      return true;
    },

    // ═══════════════ ЗАДАЧИ ═══════════════
    getTasks: function () { return load(TASKS_KEY, []); },
    addTask: function (data) {
      var list = window.PED_TEACHER.getTasks();
      var t = {
        id: uid('task'),
        title: data.title || '',
        priority: data.priority || 'normal', // low, normal, high
        done: false,
        due: data.due || '',
        createdAt: new Date().toISOString()
      };
      list.push(t);
      save(TASKS_KEY, list);
      return t;
    },
    toggleTask: function (id) {
      var list = window.PED_TEACHER.getTasks();
      var t = list.find(function (x) { return x.id === id; });
      if (t) { t.done = !t.done; save(TASKS_KEY, list); }
      return t;
    },
    removeTask: function (id) {
      var list = window.PED_TEACHER.getTasks().filter(function (t) { return t.id !== id; });
      save(TASKS_KEY, list);
      return true;
    },

    // ═══════════════ ЭКСПОРТ / ИМПОРТ ═══════════════
    exportAll: function () {
      return {
        version: 'pedagog-v2.3',
        classes: window.PED_TEACHER.getClasses(),
        students: window.PED_TEACHER.getStudents(),
        grades: window.PED_TEACHER.getGrades(),
        notes: window.PED_TEACHER.getNotes(),
        tasks: window.PED_TEACHER.getTasks(),
        exportDate: new Date().toISOString()
      };
    },
    importAll: function (data) {
      if (!data) return false;
      if (data.classes) save(CLASSES_KEY, data.classes);
      if (data.students) save(STUDENTS_KEY, data.students);
      if (data.grades) save(GRADES_KEY, data.grades);
      if (data.notes) save(NOTES_KEY, data.notes);
      if (data.tasks) save(TASKS_KEY, data.tasks);
      return true;
    },
    clearAll: function () {
      localStorage.removeItem(CLASSES_KEY);
      localStorage.removeItem(STUDENTS_KEY);
      localStorage.removeItem(GRADES_KEY);
      localStorage.removeItem(NOTES_KEY);
      localStorage.removeItem(TASKS_KEY);
      return true;
    },

    // Статистика
    getStats: function () {
      return {
        classes: window.PED_TEACHER.getClasses().length,
        students: window.PED_TEACHER.getStudents().length,
        grades: window.PED_TEACHER.getGrades().length,
        notes: window.PED_TEACHER.getNotes().length,
        tasks: window.PED_TEACHER.getTasks().filter(function (t) { return !t.done; }).length
      };
    }
  };

  console.log('[PED] Teacher Store v3.0 loaded');
})();
