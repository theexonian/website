export default {
  beforeUpdate(event) {
	// Update description to be the first 100 characters of the content if description is not provided
    const { data } = event.params;

    if (!data.description) {
      event.params.data.description = data.content.substring(0, 100);
    }
  },
};
