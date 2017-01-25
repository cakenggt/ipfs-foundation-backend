module.exports = function(sequelize, DataTypes) {

  /**
   * All of your model definitions go here.
   * Return an object where each key is a model
   * name and the value is the result of sequelize.define
   * Don't forget to use the provided DataTypes object to define
   * your column data types
   */
	var File = sequelize.define('file', {
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: DataTypes.TEXT,
		hash: {
			type: DataTypes.STRING,
			allowNull: false
		}
	});

	var Comment = sequelize.define('comment', {
		text: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	});

	Comment.belongsTo(File);

	return {
    sequelize: sequelize,
    File: File,
    Comment: Comment
  };

};
