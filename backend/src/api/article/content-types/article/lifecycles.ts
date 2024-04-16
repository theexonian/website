export default {
  beforeUpdate(event) {
    // Update description to be the first 100 characters of the content if description is not provided
	// This activates on each update of article content
    const { data } = event.params;

    if (!data.description && data.content) {
      event.params.data.description = data.content.substring(0, 100) + '...'
    }
  },
};
