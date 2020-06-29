const formatData = function (data) {
  return data.replace(/\r\n/g, '<br>');
};

const getDateAndTime = function (date) {
  const dateObject = new Date(date);
  const day = dateObject.toDateString();
  const time = dateObject.toLocaleTimeString();
  return { day, time };
};

class Comment {
  constructor(name, comment, date) {
    this.name = name;
    this.comment = comment;
    this.date = date;
  }

  toHTML() {
    let div = '';
    div += '<div class="feedback">';
    div += `<div><b>Date: </b>${this.date} </div>`;
    // div += `<div><b>Time: </b>${getDateAndTime(this.date).time} </div>`;
    div += `<div><b>Name: </b>${formatData(this.name)} </div>`;
    div += `<div><b>Comment: </b>${formatData(this.comment)} </div>`;
    div += '</div>';
    return div;
  }
}

module.exports = Comment;
