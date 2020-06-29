const formatData = function (data) {
  return data.replace(/\r\n/g, '<br>');
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
    div += `<div><b>Name: </b>${formatData(this.name)} </div>`;
    div += `<div><b>Comment: </b>${formatData(this.comment)} </div>`;
    div += '</div>';
    return div;
  }
}

module.exports = Comment;
