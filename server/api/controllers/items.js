const mongoose = require("mongoose");

const Items = require("../models/items");

exports.all_item =  (req, res) => {
    Items.find({trade_completed : false})
        .then(items => {
            res.status(200).json(items);
        }).catch(error => {
        res.status(500).json({
            error
        });
    });
}

exports.count_item =  (req, res) => {
    Items.count({trade_completed : true})
        .then(items => {
            res.status(200).json(items);
        }).catch(error => {
        res.status(500).json({
            error
        });
    });
}

exports.one_item = (req, res) => {
    const itemId = req.params.itemId;
    Items.findById(itemId)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found item with id " + itemId });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Item with id=" + itemId });
        });
};

exports.item_bytype = (req, res) => {
    const itemType = req.params.itemType;
    Items.find({$and: [{item_type : itemType},{trade_completed : false}]})
        .then((itembytype) => {
        res.status(200).json(itembytype);
    }).catch(error => {
        res.status(500).json({
            error
        });
    });
}

exports.item_byuser = (req, res) => {
    const userId = req.params.userId;
    Items.find({$and: [{user_id : userId},{trade_completed : false}]})
        .then((itembyuser) => {
        res.status(200).json(itembyuser);
    }).catch(error => {
        res.status(500).json({
            error
        });
    });
}

exports.item_byusertype = (req, res) => {
    const userId = req.params.userId;
    const itemType = req.params.itemType;
    Items.find({$and : [{user_id : userId},{item_type :itemType}, {trade_completed : false}]})
        .then((itembyusertype) => {
        res.status(200).json(itembyusertype);
    }).catch(error => {
        res.status(500).json({
            error
        });
    });
}

exports.item_bygenreconsole = (req, res) => {
    const oneGenre = req.params.genre;
    const oneConsole = req.params.console;
    Items.find({$and : [{$or : [{genre :oneGenre}, {console: oneConsole}]}, {trade_completed : false}]}).limit(5)
        .then((itembygenre) => {
            res.status(200).json(itembygenre);
        }).catch(error => {
        res.status(500).json({
            error
        });
    });
}

exports.item_byconsole = (req, res) => {
    const oneConsole = req.params.console;
    Items.find({$and : [{console :oneConsole}, {trade_completed : false}]}).limit(2)
        .then((itembyconsole) => {
            res.status(200).json(itembyconsole);
        }).catch(error => {
        res.status(500).json({
            error
        });
    });
}

exports.update_item = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const itemId = req.params.itemId;

    Items.כןמגfindByIdAndUpdate(itemId, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Item with id=${itemId}. Maybe Item was not found!`
                });
            } else res.send({ message: "Item was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Item with id=" + itemId
            });
        });
};


exports.delete_item = async (req, res, nex) => {
    const itemId = req.params.itemId;
    Items.find({_id: itemId}).then((item) => {
        if (!item) {
            return res.status(404).json({
                message: 'Item was not found'
            })
        } else {
            Items.deleteOne({_id: itemId.toString()}).exec().then(() => {
                res.status(200).json({
                    message: `item id :  ${itemId} deleted`
                })
            })
        }
    }).catch(error => {
        res.status(500).json({
            error
        })
    });
}

exports.add_newItem = (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId);
    console.log('new item')
    Items.find({name: req.body.name})
        .exec()
        .then(item => {
            if (item.length >= 1) {
                return res.status(409).json({
                    message: "Item exists"
                });
            } else {
                const newItem = new Items(
                    {
                        _id: new mongoose.Types.ObjectId(),
                        user_id: userId,
                        item_type: req.body.item_type,
                        name: req.body.name,
                        item_condition: req.body.item_condition,
                        author: req.body.author,
                        genre: req.body.genre,
                        console: req.body.console,
                        description: req.body.description,
                        image: req.body.image,
                        image_public_id: req.body.image_public_id,
                        trade_completed: false
                    }
                );
                newItem.save().then(result => {
                    res.status(201).json({
                        message: "succeded adding an item"
                    });
                })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        });

}
