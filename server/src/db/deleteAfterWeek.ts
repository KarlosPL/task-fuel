import getDataPost from "./database";

const deleteTasksAfterSevenDays = async () => {
  try {
    const query = `DELETE FROM tasks WHERE isDeleted = 1 AND TIMESTAMPDIFF(DAY, date_created, NOW()) >= 7`;
    const result = await getDataPost(query);
    if (result.affectedRows > 0) {
      console.log(
        `Deleted ${result.affectedRows} tasks that were removed more than 7 days ago.`
      );
    }
  } catch (error) {
    console.error('Error while deleting tasks after 7 days:', error);
  }
};

export default deleteTasksAfterSevenDays;