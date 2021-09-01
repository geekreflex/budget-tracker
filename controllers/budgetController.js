const budgetController = {};

budgetController.create = async (req, res) => {
  const { name, total } = req.body;

  if (!req.body) {
    return res.status(400).send({
      message: 'Content cannot be empty!',
    });
  }

  let budget = {
    name: name,
    total: total,
    userId: req.userId.userId,
  };

  req.getConnection((error, conn) => {
    conn.query('INSERT INTO budgets set ?', budget, (error, results, field) => {
      if (error) {
        return res.status(400).send({
          message: error.message || 'Error occurred',
        });
      }
      conn.query(
        'SELECT * FROM budgets WHERE id = ?',
        [results.insertId],
        (error, results, field) => {
          if (error) {
            return res.status(400).send({
              message: error.message || 'Error occurred',
            });
          }

          res.status(201).send({
            message: 'Budget created successfully',
            data: results[0],
          });
        }
      );
    });
  });
};

budgetController.getAll = async (req, res) => {
  const userId = req.user.id;
  req.getConnection((error, conn) => {
    conn.query(
      'SELECT * FROM budgets WHERE userId = ?',
      [userId],
      (error, results, field) => {
        if (error) {
          return res.status(400).send({
            message: error.message || 'Error occured',
          });
        }

        if (results.length > 0) {
          return res.status(200).send({
            message: 'Budgets retrieved successfully',
            budgets: results,
          });
        } else {
          return res.status(404).send({
            message: 'No Budgets',
          });
        }
      }
    );
  });
};

budgetController.getOne = async (req, res) => {
  const { id } = req.params;

  req.getConnection((error, conn) => {
    conn.query(
      'SELECT * FROM budgets WHERE id = ?',
      [id],
      (error, results, field) => {
        if (error) {
          return res
            .status(400)
            .send({ message: error.message || 'Error occured' });
        }

        res.status(200).json({
          message: 'Budget retrieved',
          budget: results[0],
        });
      }
    );
  });
};

budgetController.update = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { name, total } = req.body;

  req.getConnection((error, conn) => {
    conn.query(
      'UPDATE budgets SET name = ?, total = ?, userId = ? WHERE id = ?',
      [name, total, userId, id],
      (error, results, field) => {
        if (error) {
          return res.status(500).send({
            message: error.message || 'Error occured',
          });
        }

        conn.query(
          'SELECT * FROM budgets WHERE id = ?',
          [id],
          (error, results, field) => {
            if (error) {
              return res
                .status(400)
                .send({ message: error.message || 'Error occured' });
            }
            res.status(200).send({
              message: 'Budget updated successfully',
              data: results[0],
            });
          }
        );
      }
    );
  });
};

budgetController.delete = async (req, res) => {
  const { id } = req.params;
  req.getConnection((error, conn) => {
    conn.query(
      'DELETE FROM budgets WHERE id = ?',
      [id],
      (error, results, field) => {
        if (error) {
          return res.status(400).send({
            message: 'Error deleting budgets',
          });
        }

        conn.query(
          'DELETE FROM expenses WHERE budgetId = ?',
          [id],
          (error, results, field) => {
            if (error) {
              return res.status(400).send({
                message: 'Error deleting expenses',
              });
            }

            res.status(200).send({
              message: 'Deleted Successfully',
              id: id,
            });
          }
        );
      }
    );
  });
};

module.exports = budgetController;
