const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: [
      'id',
      'tag_name'
    ],
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        as: 'product_tags',
        attributes: ['id', 'product_name', 'price', 'stock'],
      }
    ]
  })
    .then(Data => res.json(Data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'tag_name'
    ],
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        as: 'product_tag',
        attributes: ['id', 'product_name', 'price', 'stock'],
      }
    ]
  })
    .then(Data => {
      if (!Data) {
        res.status(404).json({ message: 'No Tag Found' });
        return;
      }
      res.json(Data);
    })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(Data => res.json(Data))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  },
    {
      where: {
        id: req.params.id
      }
    })
    .then(Data => {
      if (!Data) {
        res.status(404).json({ message: 'No Tag Found' });
        return;
      }
      res.json(Data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(Data => {
      if (!Data) {
        res.status(404).json({ message: 'No Tag Found' });
        return;
      }
      res.json(Data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;
