const express = require("express");
const router = express.Router();
const { Page, User, Tag } = require("../models");

// GET /wiki
router.get("/", async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(pages);
  } catch (error) {
    next(error);
  }
});

// POST /wiki
router.post("/", async (req, res, next) => {
  console.log("REQUEST BODY:", req.body);
  try {
    const [thisUser, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      },
    });

    const thisPage = await Page.create(req.body);

    await thisPage.setAuthor(thisUser);

    if (req.body.tags) {
      const tagArray = req.body.tags.split(" ");
      const tags = [];
      for (let tagName of tagArray) {
        const [tag, wasCreated] = await Tag.findOrCreate({
          where: {
            name: tagName,
          },
        });
        tags.push(tag);
      }
      await thisPage.addTags(tags);
    }

    res.send(thisPage);
  } catch (error) {
    next(error);
  }
});

// GET /wiki/search
router.get("/search", async (req, res, next) => {
  try {
    const pages = await Page.findByTag(req.query.search);
    res.send(pages);
  } catch (error) {
    next(error);
  }
});

// PUT /wiki/:slug
router.put("/:slug", async (req, res, next) => {
  try {
    const foundPage = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });

    const updatedPage = await foundPage.update(req.body);

    if (req.body.tags) {
      const tagArray = req.body.tags.split(" ");
      const tags = await Promise.all(
        tagArray.map(async (tagName) => {
          const [tag, wasCreated] = await Tag.findOrCreate({
            where: {
              name: tagName,
            },
          });
          return tag;
        })
      );

      await updatedPage.setTags(tags);
    }
    res.send(updatedPage);
  } catch (error) {
    next(error);
  }
});

// GET /wiki/:slug
router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
      include: [
        {
          model: Tag,
          through: { attributes: [] }, // exclude join table data
        },
        {
          model: User,
          as: "author",
        },
      ],
    });
    if (page === null) {
      res.status(404).send(notFoundPage());
    } else {
      res.send(page);
    }
  } catch (error) {
    next(error);
  }
});

// GET /wiki/:slug/similar
router.get("/:slug/similar", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
      include: [{ model: Tag }],
    });
    const tagNames = page.tags.map((tag) => tag.name);
    const similars = await page.findSimilar(tagNames);
    res.send(similars);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
