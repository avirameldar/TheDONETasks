const normalizeTask = async (task, userId) => {
  const image = {
    alt: task.image?.alt || "Task image",
    url:
      task.image?.url ||
      "https://cdn.pixabay.com/photo/2017/11/07/08/05/turn-on-2925962_1280.jpg",
  };
  return {
    ...task,
    image: image,
    user_id: task.user_id || userId,
  };
};

module.exports = normalizeTask;
