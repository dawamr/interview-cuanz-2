const { Movie } = require('../models');

module.exports = {
    createProduct: async () => {
        const payload = {
            title: 'Test Movie',
            year: 2022,
            published: true,
            description: 'Test Movie',
            createdAt: new Date(),
            updatedAt: new Date()
        }
            

        let movie = await Movie.findOne({
            where: { title: payload.title }
        });
        if (!movie) {
            movie = await Movie.create(payload);
            await movie.save();
        }
        
        return { movie };
    }
}