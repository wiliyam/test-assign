'use strict';

/**
 * college controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// module.exports = createCoreController('api::college.college');


module.exports = createCoreController("api::college.college", ({ strapi }) => ({
    async getsimilar(ctx) {
        try {
            const { params } = ctx
            const cl = await strapi.db.query("api::college.college").findOne({ where: { id: params.id }, populate: ['courses'] })
            const rawQuery = `
            SELECT *
            FROM colleges
            WHERE Location->>'state' = :state
          `;
          console.log("cl::",cl)
            const results = await strapi.db.connection.raw(rawQuery, {
                state: cl.Location.state
            });
            ctx.body = results || [];
        } catch (error) {
            console.log("error:", error)
            ctx.body = error;
        }
    },

    async getPerByRegion(ctx) {
        try {
            const rawQuery = `
            SELECT
            Location->>'state' AS state,
            COUNT(*) * 100.0 / (SELECT COUNT(*) FROM colleges) AS percentage
            FROM colleges
            GROUP BY Location->>'state'
            ORDER BY percentage DESC; `;
            const results = await strapi.db.connection.raw(rawQuery);
            ctx.body = results || [];
        } catch (error) {
            console.log("error:", error)
            ctx.body = error;
        }
    },
    async getPerByCourse(ctx) {
        try {
            const colleges = await strapi.db.query("api::college.college").findMany({});
    
            const courseCounts = {};
            const totalColleges = colleges.length;

            colleges.forEach((college) => {
            college.courses.forEach((course) => {
                courseCounts[course] = (courseCounts[course] || 0) + 1;
            });
            });

            const coursePercentages = Object.entries(courseCounts).map(([course, count]) => ({
            course,
            percentage: (count / totalColleges) * 100,
            }));
            ctx.body = coursePercentages || [];
        } catch (error) {
            console.log("error:", error)
            ctx.body = error;
        }
    },
    async getCollegesByState(ctx){
        try {
            const { params } = ctx
            const rawQuery = `
            SELECT *
            FROM colleges
            WHERE Location->>'state' = :state
          `;
            const results = await strapi.db.connection.raw(rawQuery, {
                state: params.state
            });
            ctx.body = results.rows || [];
        } catch (error) {
            ctx.body = error
        }
    },
    async getCollegesByCourse(ctx){
        try {
            const { params } = ctx
            const colleges = await strapi.db.query("api::college.college").findMany({});
            const filteredColleges = colleges.filter((college) => college.courses.includes(params.course));
              return filteredColleges;
        } catch (error) {
            console.log("error:", error)
            ctx.body = error;
        }
    },
    async studentByCollege(ctx){
        try {
        const { params } = ctx
        const rawQuery = `select students.*,colleges.name,colleges.id from students,colleges,students_college_links where students_college_links.college_id = ${params.id} and students.id = students_college_links.student_id and colleges.id = students_college_links.college_id;`
        const results = await strapi.db.connection.raw(rawQuery);
        ctx.body = results;
        } catch (error) {
            console.log("error:", error)
            ctx.body = error;
        }
    }
}));