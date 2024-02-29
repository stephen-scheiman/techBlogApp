module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },

  eq: (user_id, posted_by) => {
    if (user_id === posted_by) {
      return true;
    } else {
      return false;
    }
  }
};
