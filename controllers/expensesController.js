const expensesController = {};

expensesController.create = async (req, res) => {
  const { name, cost, budgetId } = req.body;

  if (!req.body) {
    return res.status(400).send({
      message: 'Content cannot be empty!',
    });
  }

  let expense = {
    name: name,
    cost: cost,
    budgetId: budgetId,
    userId: req.user.id,
  };

  req.getConnection((error, conn) => {
    conn.query(
      'INSERT INTO expenses set ?',
      expense,
      (error, results, field) => {
        if (error) {
          return res
            .status(400)
            .send({ message: error.message || 'Error occured' });
        }
        conn.query(
          'SELECT * FROM expenses WHERE id = ?',
          [results.insertId],
          (error, results, field) => {
            if (error) {
              return res
                .status(400)
                .send({ message: error.message || 'Error occured' });
            }
            res.status(201).send({
              message: 'Expense created successfully',
              data: results[0],
            });
          }
        );
      }
    );
  });
};

expensesController.getAll = async (req, res) => {
  const id = req.params.id;

  req.getConnection((error, conn) => {
    conn.query(
      'SELECT * FROM expenses WHERE budgetId = ?',
      [id],
      (error, results, field) => {
        if (error) {
          return res.status(400).send({
            message: error.message || 'Error occured',
          });
        }

        if (results.length > 0) {
          return res.status(200).send({
            message: 'Expenses retrieved successfully',
            data: results,
          });
        }

        return res.status(404).send({
          message: 'No Expenses',
          data: results,
        });
      }
    );
  });
};

expensesController.delete = async (req, res) => {
  const { id } = req.params;

  req.getConnection((error, conn) => {
    conn.query(
      'DELETE FROM expenses WHERE id = ?',
      [id],
      (error, results, field) => {
        if (error) {
          return res.status(400).send({
            message: error.message || 'Error occured',
          });
        }

        return res.status(200).send({
          message: 'Expense Deleted',
          id: id,
        });
      }
    );
  });
};

module.exports = expensesController;
