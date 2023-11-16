import { query } from '../../../db/db';
import { escape } from 'mysql';
import ReadArticle from '../hooks/read';

// TEMP IGNORED : websocket issues w/ scroll sepo scan

export default async function pullProposal(i, title, content, tags) {
    const proposal = await ReadArticle(i);
    if (title == proposal[1] && content == proposal[2]) {
        try {
            const pushArticleQuery = `
            INSERT INTO article (id, title, content, createdAt, accepted, creator_address, likes, deprecated)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?);
            `;

            const sanitizedParams = [
                escape(Number(proposal[0])), // Sanitize the ID parameter
                escape(String(proposal[1])), // Sanitize the title parameter
                escape(String(proposal[2])), // Sanitize the content parameter
                escape(Number(proposal[10]) - 604800), // Sanitize and calculate the createdAt parameter
                escape(Boolean(proposal[5])), // Sanitize the accepted parameter
                escape(String(proposal[3])), // Sanitize the creator_address parameter
                0, // No need to sanitize constant values
                0 // No need to sanitize constant values
              ];

            await query(pushArticleQuery, sanitizedParams);

            pushTags(Number(proposal[0], tags));

        } catch (error) {
            console.error('Error pushing new article:', error);
        }
        return true;
    }
    return false;
};

async function pushTags(id, tags) {
    const tagArray = tags.split(',');

    for (let i = 0; i < tagArray.length; i++) {
        const tag = tagArray[i].trim(); // Remove any leading/trailing spaces

        // Check if the tag has the correct format
        if (/^[a-zA-Z0-9-]+(?:,[a-zA-Z0-9-]+)*$/.test(tag)) {
            try {
                // Insert the tag into the tags table
                const pushTagQuery = `
                INSERT IGNORE INTO tags (name)
                VALUES (?);
                `;

                await query(pushTagQuery, escape(tag));

                // Get the id of the inserted tag
                const getTagIdQuery = `
                SELECT id FROM tags WHERE name = ?;
                `;

                const result = await query(getTagIdQuery, tag);

                if (result.length > 0) {
                    const tagId = result[0].id;

                    // Call the function to link the proposal id with the tag id
                    linkProposalWithTag(id, tagId);
                }
            } catch (error) {
                console.error('Error pushing tag:', error);
            }
        }
    }
}

async function linkProposalWithTag(proposalId, tagId) {
    // Insert the proposal id and tag id into the proposal_tags table
    const linkProposalWithTagQuery = `
    INSERT INTO proposal_tags (proposal_id, tag_id)
    VALUES (?, ?);
    `;

    await query(linkProposalWithTagQuery, [proposalId, tagId]);
}