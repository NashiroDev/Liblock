-- CreateTable User
CREATE TABLE User (
    id SERIAL NOT NULL AUTO_INCREMENT,
    address VARCHAR(255) UNIQUE,
    email VARCHAR(255) UNIQUE,
    name VARCHAR(255) UNIQUE,
    
    CONSTRAINT User_pkey PRIMARY KEY (id)
);

-- CreateTable Article
CREATE TABLE Article (
    id INTEGER NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    createdAt BIGINT NOT NULL,
    accepted BOOLEAN,
    creator_address VARCHAR(255),
    likes INTEGER,
    deprecated INTEGER,
    
    CONSTRAINT Article_pkey PRIMARY KEY (id)
);

-- CreateTable Tags
CREATE TABLE Tags (
    id INTEGER NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    
    CONSTRAINT Tags_pkey PRIMARY KEY (id)
);

-- CreateTable Comment
CREATE TABLE Comment (
    id SERIAL NOT NULL AUTO_INCREMENT,
    content TEXT,
    user_id INTEGER,
    article_id INTEGER,
    
    CONSTRAINT Comment_pkey PRIMARY KEY (id)
);

-- Create Many-To-Many Relationship between Article and Tags
CREATE TABLE Article_Tags (
    article_id INTEGER,
    tag_id INTEGER,
    
    CONSTRAINT Article_Tags_article_id_fkey FOREIGN KEY (article_id) REFERENCES Article(id) ON DELETE CASCADE,
    CONSTRAINT Article_Tags_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES Tags(id) ON DELETE CASCADE
);