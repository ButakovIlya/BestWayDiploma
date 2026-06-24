--
-- PostgreSQL database dump
--

-- Dumped from database version 15.14 (Debian 15.14-1.pgdg13+1)
-- Dumped by pg_dump version 15.10

-- Started on 2026-05-04 18:10:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 3542 (class 1262 OID 16384)
-- Name: bestway; Type: DATABASE; Schema: -; Owner: bestway
--

CREATE DATABASE bestway WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE bestway OWNER TO bestway;

\connect bestway

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 214 (class 1259 OID 16385)
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: bestway
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO bestway;

--
-- TOC entry 215 (class 1259 OID 16388)
-- Name: comments; Type: TABLE; Schema: public; Owner: bestway
--

CREATE TABLE public.comments (
    author_id integer NOT NULL,
    route_id integer,
    place_id integer,
    "timestamp" timestamp without time zone NOT NULL,
    comment character varying NOT NULL,
    id integer NOT NULL,
    post_id integer
);


ALTER TABLE public.comments OWNER TO bestway;

--
-- TOC entry 216 (class 1259 OID 16393)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: bestway
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO bestway;

--
-- TOC entry 3543 (class 0 OID 0)
-- Dependencies: 216
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bestway
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 217 (class 1259 OID 16394)
-- Name: likes; Type: TABLE; Schema: public; Owner: bestway
--

CREATE TABLE public.likes (
    author_id integer NOT NULL,
    route_id integer,
    "timestamp" timestamp without time zone NOT NULL,
    id integer NOT NULL,
    place_id integer,
    post_id integer
);


ALTER TABLE public.likes OWNER TO bestway;

--
-- TOC entry 218 (class 1259 OID 16397)
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: bestway
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.likes_id_seq OWNER TO bestway;

--
-- TOC entry 3544 (class 0 OID 0)
-- Dependencies: 218
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bestway
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- TOC entry 219 (class 1259 OID 16398)
-- Name: photos; Type: TABLE; Schema: public; Owner: bestway
--

CREATE TABLE public.photos (
    url character varying NOT NULL,
    uploaded_at timestamp without time zone DEFAULT '2025-03-26 16:16:43.124275'::timestamp without time zone NOT NULL,
    uploaded_by integer NOT NULL,
    place_id integer,
    route_id integer,
    id integer NOT NULL
);


ALTER TABLE public.photos OWNER TO bestway;

--
-- TOC entry 220 (class 1259 OID 16404)
-- Name: photos_id_seq; Type: SEQUENCE; Schema: public; Owner: bestway
--

CREATE SEQUENCE public.photos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.photos_id_seq OWNER TO bestway;

--
-- TOC entry 3545 (class 0 OID 0)
-- Dependencies: 220
-- Name: photos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bestway
--

ALTER SEQUENCE public.photos_id_seq OWNED BY public.photos.id;


--
-- TOC entry 221 (class 1259 OID 16405)
-- Name: places; Type: TABLE; Schema: public; Owner: bestway
--

CREATE TABLE public.places (
    name character varying NOT NULL,
    category character varying(16) NOT NULL,
    type character varying(20),
    tags character varying,
    coordinates json,
    photo character varying,
    map_name character varying,
    id integer NOT NULL,
    city character varying(16) NOT NULL,
    json_data json,
    object_id integer,
    description character varying,
    website_url character varying
);


ALTER TABLE public.places OWNER TO bestway;

--
-- TOC entry 222 (class 1259 OID 16410)
-- Name: places_id_seq; Type: SEQUENCE; Schema: public; Owner: bestway
--

CREATE SEQUENCE public.places_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.places_id_seq OWNER TO bestway;

--
-- TOC entry 3546 (class 0 OID 0)
-- Dependencies: 222
-- Name: places_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bestway
--

ALTER SEQUENCE public.places_id_seq OWNED BY public.places.id;


--
-- TOC entry 223 (class 1259 OID 16411)
-- Name: posts; Type: TABLE; Schema: public; Owner: bestway
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    route_id integer NOT NULL,
    author_id integer NOT NULL,
    title character varying NOT NULL,
    description text,
    photo character varying,
    created_at timestamp without time zone DEFAULT '2025-08-30 12:10:18.259971'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone DEFAULT '2025-08-30 12:10:18.259971'::timestamp without time zone NOT NULL
);


ALTER TABLE public.posts OWNER TO bestway;

--
-- TOC entry 224 (class 1259 OID 16418)
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: bestway
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO bestway;

--
-- TOC entry 3547 (class 0 OID 0)
-- Dependencies: 224
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bestway
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- TOC entry 225 (class 1259 OID 16419)
-- Name: route_places; Type: TABLE; Schema: public; Owner: bestway
--

CREATE TABLE public.route_places (
    route_id integer NOT NULL,
    place_id integer NOT NULL,
    "order" integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.route_places OWNER TO bestway;

--
-- TOC entry 226 (class 1259 OID 16422)
-- Name: route_places_id_seq; Type: SEQUENCE; Schema: public; Owner: bestway
--

CREATE SEQUENCE public.route_places_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.route_places_id_seq OWNER TO bestway;

--
-- TOC entry 3548 (class 0 OID 0)
-- Dependencies: 226
-- Name: route_places_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bestway
--

ALTER SEQUENCE public.route_places_id_seq OWNED BY public.route_places.id;


--
-- TOC entry 227 (class 1259 OID 16423)
-- Name: routes; Type: TABLE; Schema: public; Owner: bestway
--

CREATE TABLE public.routes (
    name character varying NOT NULL,
    author_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT '2025-03-23 15:27:28.954607'::timestamp without time zone NOT NULL,
    updated_at timestamp without time zone DEFAULT '2025-03-23 15:27:28.954607'::timestamp without time zone NOT NULL,
    duration integer,
    distance integer,
    id integer NOT NULL,
    type character varying(12) NOT NULL,
    city character varying(16) NOT NULL,
    is_custom boolean DEFAULT false NOT NULL,
    photo character varying,
    json_data json,
    is_publicated boolean DEFAULT false NOT NULL,
    description character varying
);


ALTER TABLE public.routes OWNER TO bestway;

--
-- TOC entry 228 (class 1259 OID 16432)
-- Name: routes_id_seq; Type: SEQUENCE; Schema: public; Owner: bestway
--

CREATE SEQUENCE public.routes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.routes_id_seq OWNER TO bestway;

--
-- TOC entry 3549 (class 0 OID 0)
-- Dependencies: 228
-- Name: routes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bestway
--

ALTER SEQUENCE public.routes_id_seq OWNED BY public.routes.id;


--
-- TOC entry 229 (class 1259 OID 16433)
-- Name: surveys; Type: TABLE; Schema: public; Owner: bestway
--

CREATE TABLE public.surveys (
    name character varying NOT NULL,
    author_id integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    status character varying(17) NOT NULL,
    data json,
    id integer NOT NULL,
    city character varying(16) DEFAULT 'PERM'::character varying NOT NULL,
    places json,
    prompt character varying
);


ALTER TABLE public.surveys OWNER TO bestway;

--
-- TOC entry 230 (class 1259 OID 16439)
-- Name: surveys_id_seq; Type: SEQUENCE; Schema: public; Owner: bestway
--

CREATE SEQUENCE public.surveys_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.surveys_id_seq OWNER TO bestway;

--
-- TOC entry 3550 (class 0 OID 0)
-- Dependencies: 230
-- Name: surveys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bestway
--

ALTER SEQUENCE public.surveys_id_seq OWNED BY public.surveys.id;


--
-- TOC entry 231 (class 1259 OID 16440)
-- Name: users; Type: TABLE; Schema: public; Owner: bestway
--

CREATE TABLE public.users (
    id integer NOT NULL,
    phone character varying NOT NULL,
    first_name character varying,
    last_name character varying,
    middle_name character varying,
    registration_date timestamp without time zone NOT NULL,
    is_banned boolean NOT NULL,
    is_admin boolean NOT NULL,
    photo character varying,
    description text,
    gender character varying(16) DEFAULT 'MALE'::character varying NOT NULL,
    birth_date date
);


ALTER TABLE public.users OWNER TO bestway;

--
-- TOC entry 232 (class 1259 OID 16446)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: bestway
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO bestway;

--
-- TOC entry 3551 (class 0 OID 0)
-- Dependencies: 232
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bestway
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3307 (class 2604 OID 16447)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 3308 (class 2604 OID 16448)
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- TOC entry 3310 (class 2604 OID 16449)
-- Name: photos id; Type: DEFAULT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.photos ALTER COLUMN id SET DEFAULT nextval('public.photos_id_seq'::regclass);


--
-- TOC entry 3311 (class 2604 OID 16450)
-- Name: places id; Type: DEFAULT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.places ALTER COLUMN id SET DEFAULT nextval('public.places_id_seq'::regclass);


--
-- TOC entry 3312 (class 2604 OID 16451)
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- TOC entry 3315 (class 2604 OID 16452)
-- Name: route_places id; Type: DEFAULT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.route_places ALTER COLUMN id SET DEFAULT nextval('public.route_places_id_seq'::regclass);


--
-- TOC entry 3318 (class 2604 OID 16453)
-- Name: routes id; Type: DEFAULT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.routes ALTER COLUMN id SET DEFAULT nextval('public.routes_id_seq'::regclass);


--
-- TOC entry 3321 (class 2604 OID 16454)
-- Name: surveys id; Type: DEFAULT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.surveys ALTER COLUMN id SET DEFAULT nextval('public.surveys_id_seq'::regclass);


--
-- TOC entry 3323 (class 2604 OID 16455)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3518 (class 0 OID 16385)
-- Dependencies: 214
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: bestway
--

COPY public.alembic_version (version_num) FROM stdin;
37900156778b
\.


--
-- TOC entry 3519 (class 0 OID 16388)
-- Dependencies: 215
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: bestway
--

COPY public.comments (author_id, route_id, place_id, "timestamp", comment, id, post_id) FROM stdin;
51	\N	\N	2026-03-05 16:05:17.749009	Привет	69	60
50	\N	\N	2026-03-05 16:05:24.719764	Я тоже!!!	70	60
6	\N	\N	2026-03-08 19:26:10.962814	Z	71	63
\.


--
-- TOC entry 3521 (class 0 OID 16394)
-- Dependencies: 217
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: bestway
--

COPY public.likes (author_id, route_id, "timestamp", id, place_id, post_id) FROM stdin;
6	\N	2025-10-09 06:40:17.653602	61	\N	58
51	\N	2026-03-05 16:05:10.142786	66	\N	60
50	\N	2026-03-05 16:05:16.131234	67	\N	60
50	\N	2026-03-05 16:08:16.190823	68	\N	59
50	\N	2026-03-05 16:08:20.858632	69	\N	58
52	\N	2026-03-05 16:11:08.153045	70	\N	60
51	\N	2026-03-05 16:11:09.572808	71	\N	58
52	\N	2026-03-05 16:11:10.398328	72	\N	59
6	\N	2026-03-05 16:22:27.920534	74	\N	60
6	\N	2026-03-06 09:20:03.397552	75	\N	62
6	\N	2026-03-08 19:26:03.741687	76	\N	63
\.


--
-- TOC entry 3523 (class 0 OID 16398)
-- Dependencies: 219
-- Data for Name: photos; Type: TABLE DATA; Schema: public; Owner: bestway
--

COPY public.photos (url, uploaded_at, uploaded_by, place_id, route_id, id) FROM stdin;
media/places/places_13-07-2025_15-48-55.webp	2025-07-13 15:48:55.256439	6	39	\N	31
\.


--
-- TOC entry 3525 (class 0 OID 16405)
-- Dependencies: 221
-- Data for Name: places; Type: TABLE DATA; Schema: public; Owner: bestway
--

COPY public.places (name, category, type, tags, coordinates, photo, map_name, id, city, json_data, object_id, description, website_url) FROM stdin;
Музей Мотовилихинских заводов	MUSEUM	LOCAL_HISTORY	1	[58.03571, 56.310131]	media/places/places_13-09-2025_10-06-25.jpg	 	52	PERM	\N	\N	Описание	\N
Мемориальный дом-музей "Подпольная типография"	MUSEUM	MEMORIAL	исторический	[58.010422, 56.201654]	media/places/places_13-09-2025_10-07-16.png	 	53	PERM	\N	\N	Описание	\N
Пермский музей кукол	MUSEUM	CHILDREN	1	[58.010967, 56.242592]	media/places/places_13-09-2025_10-16-28.webp	 	68	PERM	\N	\N	Описание	\N
Музей Камской ГЭС	MUSEUM	LOCAL_HISTORY	1	[58.114554, 56.328143]	media/places/places_13-09-2025_10-17-12.jpg	 	69	PERM	\N	\N	Описание	\N
Театр-Театр	THEATER	MUSICAL	драма, балет, музыкальный концерт, театр теней	[58.008143, 56.216308]	media/places/places_13-09-2025_10-18-30.jpg	 	71	PERM	\N	\N	Описание	\N
У моста	THEATER	COMEDY	эксцентрическая комедия	[58.013772, 56.229356]	media/places/places_13-09-2025_10-20-02.png	 	73	PERM	\N	\N	Описание	\N
Пермская государственная художественная галерея	GALLERY	ART	 	[58.012573, 56.208155]	media/places/places_02-09-2025_12-29-32.jpg	 	42	PERM	\N	\N	Описание	\N
Пермский театр юного зрителя, ТЮЗ	THEATER	CHILDREN_PERFORMANCE	драма, комедия, мюзикл	[58.01149, 56.246664]	media/places/places_13-09-2025_10-20-46.jpg	 	74	PERM	\N	\N	Описание	\N
Сцена Молот	THEATER	CONTEMPORARY_DRAMA	мультикультурность, документальность	[58.008143, 56.216308]	media/places/places_13-09-2025_10-21-40.jpg	 	75	PERM	\N	\N	Описание	\N
Пермский театр оперы и балета имени П. И. Чайковского	THEATER	OPERA	 	[58.015932, 56.245857]	media/places/places_13-07-2025_10-51-13.jpg	 	38	PERM	\N	\N	Описание	\N
Пермский театр кукол	THEATER	CHILDREN_PERFORMANCE	сказка, сатира, спектакль-плакат, мюзикл	[57.999725, 56.258747]	media/places/places_13-09-2025_10-22-22.jpg	 	76	PERM	\N	\N	Описание	\N
ЦУМ	WALK	PRIVATE	тц	[58.011585, 56.237546]	media/places/places_23-08-2025_15-16-59.jpg	 	78	PERM	\N	\N	Описание	\N
Марис-арт	GALLERY	PRIVATE	1	[58.015307, 56.23543]	media/places/places_13-09-2025_10-00-51.jpg	 	46	PERM	\N	\N	Описание	\N
Пермская Арт-Резиденция	GALLERY	PRIVATE	1	[58.012791, 56.220558]	media/places/places_13-09-2025_10-01-46.jpg	 	47	PERM	\N	\N	Описание	\N
Музей-диорама 	MUSEUM	LOCAL_HISTORY	военный	[58.041088, 56.320487]	media/places/places_13-09-2025_10-05-41.webp	 	51	PERM	\N	\N	Описание	\N
Городская эспланада	WALK	PARK	 	[58.009535, 56.224404]	media/places/places_12-07-2025_05-24-14.jpg	 	34	PERM	\N	\N	Описание	\N
Пермяк солёные уши	LANDMARKS	HISTORICAL	1	[58.009745, 56.239738]	media/places/places_15-09-2025_12-20-40.jpg	 	89	PERM	\N	\N	Описание	\N
Пермский медведь	LANDMARKS	HISTORICAL	1	[58.0107, 56.237637]	media/places/places_15-09-2025_12-21-27.jpg	 	90	PERM	\N	\N	Описание	\N
Дом культуры	NIGHT_LIFE	CLUB	1	[58.011589, 56.245563]	media/places/places_15-09-2025_12-51-58.jpg	 	110	PERM	\N	\N	Описание	\N
Фрай	CAFE	CAFE_KAFE	1	[58.006565, 56.219263]	media/places/places_13-09-2025_10-23-59.jpg	 	86	PERM	\N	\N	Описание	\N
Такман	SKI_RESORTS	TAKMAN	1	[58.353879, 57.773602]	media/places/places_15-09-2025_12-23-09.jpg	 	94	PERM	\N	\N	Описание	\N
Сад имени Гоголя	WALK	GARDEN	1	[58.014965, 56.220937]	media/places/places_15-09-2025_12-57-38.jpg	 	115	PERM	\N	\N	Описание	\N
Олимпия	WATER_PROCEDURES	WP_SPA	1	[57.976415, 56.187119]	media/places/places_15-09-2025_12-22-19.jpg	 	92	PERM	\N	\N	Описание	\N
Люля-любя	RESTAURANT	GEORGIAN	1	[58.011234, 56.226459]	media/places/places_15-09-2025_12-17-32.jpg	 	85	PERM	\N	\N	Описание	\N
Жебреи	SKI_RESORTS	ZHEBREI	1	[57.933708, 56.659853]	media/places/places_15-09-2025_12-24-17.jpg	 	95	PERM	\N	\N	Описание	\N
Artерия	MASTER_CLASSES	MC_ART	1	[57.968947, 56.201673]	media/places/places_15-09-2025_12-27-01.webp	 	97	PERM	\N	\N	Описание	\N
KartON	DRIVE	KARTING	1	[58.040893, 56.316257]	media/places/places_15-09-2025_12-27-52.jpg	 	102	PERM	\N	\N	Описание	\N
Центральный парк развлечений им. М. Горького	WALK	PARK	 	[58.005104, 56.248988]	media/places/places_13-07-2025_11-41-21.webp	 	40	PERM	\N	\N	Описание	\N
Кonstrukt	MASTER_CLASSES	JEWELRY	1	[58.010021, 56.24529]	media/places/places_15-09-2025_12-41-00.jpg	 	103	PERM	\N	\N	Описание	\N
Айс	DRIVE	KARTING	1	[57.9541, 56.08593]	media/places/places_15-09-2025_12-42-26.webp	 	104	PERM	\N	\N	Описание	\N
Monkey river park	DRIVE	ROPE_PARK	1	[57.981083, 56.127891]	media/places/places_15-09-2025_12-43-20.jpg	 	105	PERM	\N	\N	Описание	\N
Ранчо	DRIVE	ROPE_PARK	1	[57.973739, 56.131388]	media/places/places_15-09-2025_12-44-11.jpg	 	106	PERM	\N	\N	Описание	\N
Руки Вверх	NIGHT_LIFE	CLUB	1	[58.010803, 56.249329]	media/places/places_15-09-2025_12-51-10.jpg	 	111	PERM	\N	\N	Описание	\N
Либерти	NIGHT_LIFE	BAR	1	[58.009569, 56.236117]	media/places/places_15-09-2025_12-56-43.jpg	 	113	PERM	\N	\N	Описание	\N
Перчини	RESTAURANT	ITALIAN	1	[58.008421, 56.225771]	media/places/places_13-09-2025_10-24-39.jpg	 	81	PERM	\N	\N	Описание	\N
Massante	RELAX	MASSAGE	1	[58.006635, 56.219727]	media/places/places_15-09-2025_12-45-45.jpg	 	108	PERM	\N	\N	Описание	\N
Зоопарк	FOR_KIDS	ZOO	1	[57.961992, 56.187532]	media/places/places_15-09-2025_13-09-54.webp	 	119	PERM	\N	\N	Описание	\N
Пермский зоопарк	WALK	ZOO	\N	[58.016795, 56.236969]	media/places/places_31-08-2025_20-52-15.jpg	 	35	PERM	\N	\N	Описание	https://zoo.perm.ru/
Пермская художественная галерея	GALLERY	ART	1	[58.012573, 56.208155]	media/places/places_02-09-2025_12-31-10.jpg	 	44	PERM	\N	\N	Описание	\N
Пермские термы	WATER_PROCEDURES	WP_SPA	 	[57.974913, 56.259231]	media/places/places_31-08-2025_20-53-02.webp	 	39	PERM	\N	\N	Описание	\N
Ретро-Гараж	MUSEUM	RETRO_CARS	1	[58.01506, 56.279492]	media/places/places_13-09-2025_10-10-42.jpg	 	57	PERM	\N	\N	Описание	\N
Стихия Spa	RELAX	MASSAGE	1	[58.004873, 56.203164]	media/places/places_15-09-2025_12-49-59.webp	 	107	PERM	\N	\N	Описание	\N
Curtiss	NIGHT_LIFE	BAR	1	[58.012684, 56.247513]	media/places/places_15-09-2025_12-53-21.jpg	 	112	PERM	\N	\N	Описание	\N
Парк им. Горького	WALK	PARK	1	[58.005105, 56.248991]	media/places/places_15-09-2025_12-58-52.jpg	 	116	PERM	\N	\N	Описание	\N
Райский сад	WALK	GARDEN	1	[58.038403, 56.320463]	media/places/places_15-09-2025_13-07-30.jpg	 	117	PERM	\N	\N	Описание	\N
Торопомодоро	RESTAURANT	ITALIAN	1	[58.012507, 56.244367]	media/places/places_13-09-2025_10-25-23.jpg	 	82	PERM	\N	\N	Описание	\N
Хочу Пури	RESTAURANT	GEORGIAN	1	[58.011295, 56.227898]	media/places/places_13-09-2025_10-28-51.jpg	 	84	PERM	\N	\N	Описание	\N
Цех	CAFE	CAFE_KAFE	1	[58.00468, 56.258127]	media/places/places_15-09-2025_12-19-43.webp	 	88	PERM	\N	\N	Описание	\N
Персик	RELAX	SPA	1	[58.015075, 56.238617]	media/places/places_15-09-2025_12-48-41.webp	 	109	PERM	\N	\N	Описание	\N
Monkey Grinder	CAFE	JUST_CAFE	1	[58.009444, 56.236162]	media/places/places_13-09-2025_10-26-56.png	 	87	PERM	\N	\N	Описание	\N
Галерея частных коллекций "Уникум"	GALLERY	PRIVATE	1	[57.983096, 56.18476]	media/places/places_13-09-2025_09-59-29.jpg	 	45	PERM	\N	\N	Описание	\N
Исторический парк "Россиия - моя история"	MUSEUM	HISTORICAL	1	[58.020516, 56.251397]	media/places/places_13-09-2025_10-08-01.jpg	 	54	PERM	\N	\N	Описание	\N
Дом Мешкова	MUSEUM	LOCAL_HISTORY	1	[58.018695, 56.2466]	media/places/places_13-09-2025_10-09-02.jpg	 	55	PERM	\N	\N	Описание	\N
Дом-музей Николая Славянова	MUSEUM	FAMOUS_PEOPLE	1	[58.03482, 56.308701]	media/places/places_13-09-2025_10-09-46.jpg	 	56	PERM	\N	\N	Описание	\N
La Bottega	RESTAURANT	ITALIAN	1	[58.013998, 56.234579]	media/places/places_13-09-2025_10-23-07.jpg		80	PERM	\N	\N	Описание	\N
Амфитеатр на набережной	WALK	PARK	 	[58.01654, 56.226422]	media/places/places_13-07-2025_10-46-42.jpg	 	36	PERM	\N	\N	Описание	\N
Пермский академический Театр-Театр	THEATER	MUSICAL	 	[58.008143, 56.216308]	media/places/places_13-07-2025_10-58-53.jpg	 	37	PERM	\N	\N	Описание	\N
Ротонда	WALK	PARK	 	[58.005412, 56.249868]	media/places/places_31-08-2025_20-51-38.webp	 	33	PERM	\N	\N	Пермская ротонда, или, как ее любовно называют горожане, бабушка-ротонда, — одна из главных достопримечательностей культурной столицы Урала.	\N
Смотровая площадка	WALK	PARK	 	[58.017408, 56.231254]	media/places/places_31-08-2025_21-10-39.jpeg	 	41	PERM	\N	\N	Главная смотровая площадка на набережной Перми.	\N
Музей современного искусства PERMM	MUSEUM	MODERN_ART	1	[58.012259, 56.21028]	media/places/places_13-09-2025_10-04-59.jpg	 	50	PERM	\N	\N	Описание	\N
Детский музейный центр	MUSEUM	CHILDREN	1	[58.011142, 56.243175]	media/places/places_13-09-2025_10-11-41.jpg	 	58	PERM	\N	\N	Описание	\N
Губаха	SKI_RESORTS	GUBAKHA	1	[58.864287, 57.576787]	media/places/places_13-09-2025_10-32-41.jpg	 	93	PERM	\N	\N	Описание	\N
Правительство пермского края	LANDMARKS	HISTORICAL	\N	[58.010761, 56.232485]	media/places/places_13-09-2025_08-23-34.webp	 	120	PERM	\N	\N	Описание	\N
Церковь Вознесения Господня	WALK	HISTORICAL	\N	[58.005585, 56.220839]	media/places/places_13-07-2025_11-02-51.jpg	 	21	PERM	\N	\N	Описание	
Дом   Дягилева	MUSEUM	FAMOUS_PEOPLE	1	[58.008778, 56.250415]	media/places/places_13-09-2025_10-12-24.webp	 	63	PERM	\N	\N	Описание	\N
Музей Архиерейского квартала	MUSEUM	HISTORICAL	\N	[58.015963, 56.235053]	media/places/places_13-07-2025_11-17-24.jpg	 	24	PERM	\N	\N	Описание	
Пермский музей технической миниатюры	MUSEUM	TECHNICAL	1	[58.024611, 56.28636]	media/places/places_13-09-2025_10-13-39.jpg	 	64	PERM	\N	\N	Описание	\N
А.С. Пушкин	LANDMARKS	HISTORICAL	\N	[58.009409, 56.250783]	media/places/places_13-07-2025_10-48-53.jpg	 	29	PERM	\N	\N	Описание	https://ru.wikipedia.org/wiki/%D0%9F%D0%B5%D1%80%D0%BC%D1%8C
Художественная галерея Пермский период	GALLERY	ART	1	[58.015163, 56.256317]	media/places/places_13-09-2025_10-02-50.jpg	 	48	PERM	\N	\N	В экспозиции зрители увидят живописные работы, посвященные природе Урала и России, наполненные тонкой лирикой и глубоким чувством любви к родной земле.	\N
Селенитовая комната	MUSEUM	HISTORICAL	Селенитовая комната	[58.011142, 56.243175]	media/places/places_13-09-2025_10-14-15.jpg	 	66	PERM	\N	\N	Описание	\N
Лепи нежно	MASTER_CLASSES	POTTERY	1	[58.01254, 56.251172]	media/places/places_15-09-2025_12-25-26.jpg	 	96	PERM	\N	\N	Описание	\N
Пермский планетарий	MUSEUM	PLANETARIUM	1	[58.019259, 56.271615]	media/places/places_13-09-2025_10-15-03.jpg	 	67	PERM	\N	\N	Описание	\N
Пермский театр оперы и балета им. Чайковского	THEATER	BALLET	опера	[58.015931, 56.245857]	media/places/places_13-09-2025_10-19-09.jpg	 	72	PERM	\N	\N	Описание	\N
Пермская государственная краевая универсальная библиотека имени А. М. Горького	LANDMARKS	HISTORICAL	\N	[58.00795, 56.22434]	media/places/places_15-09-2025_17-01-26.jpg	 	121	PERM	\N	\N	Описание	\N
Музей пермских древностей	MUSEUM	LOCAL_HISTORY	1	[58.013908, 56.245113]	media/places/places_13-09-2025_10-04-04.jpg	 	49	PERM	\N	\N	Описание	\N
Городская эспланада	WALK	PARK	1	[58.00867, 56.21989]	media/places/places_15-09-2025_13-08-21.jpg	 	118	PERM	\N	\N	Описание	\N
Пермский планетарий	EVENTS	PLANETARIUM	\N	[58.019259, 56.271615]	media/places/places_13-07-2025_11-27-54.jpg	 	30	PERM	\N	\N	Описание	https://www.planetarium.perm.ru/
Музей истории связи	MUSEUM	HISTORICAL	1	[58.023496, 56.271526]	media/places/places_13-09-2025_10-17-53.jpg	 	70	PERM	\N	\N	Описание	\N
Башня смерти	LANDMARKS	HISTORICAL	\N	[57.994957, 56.253858]	media/places/places_13-07-2025_11-24-00.webp	 	20	PERM	\N	\N	описание башни смерти	https://ru.wikipedia.org/wiki/%D0%9F%D0%B5%D1%80%D0%BC%D1%8C
\.


--
-- TOC entry 3527 (class 0 OID 16411)
-- Dependencies: 223
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: bestway
--

COPY public.posts (id, route_id, author_id, title, description, photo, created_at, updated_at) FROM stdin;
58	134	6		Тест	media/posts/posts_09-10-2025_06-40-12.webp	2025-10-09 06:40:12.891419	2025-10-09 06:40:12.891432
59	149	50		Тест	\N	2026-03-05 16:05:02.689785	2026-03-05 16:05:02.68979
60	148	51		Тест	\N	2026-03-05 16:05:05.415138	2026-03-05 16:05:05.415145
62	152	6		Починил генерацию	media/posts/posts_06-03-2026_09-19-54.jpg	2026-03-06 09:19:54.503029	2026-03-06 09:19:54.503039
63	158	6		Пермский маршрут	\N	2026-03-07 09:03:51.348107	2026-03-07 09:03:51.348115
\.


--
-- TOC entry 3529 (class 0 OID 16419)
-- Dependencies: 225
-- Data for Name: route_places; Type: TABLE DATA; Schema: public; Owner: bestway
--

COPY public.route_places (route_id, place_id, "order", id) FROM stdin;
140	121	1	737
140	88	5	741
140	35	6	742
140	21	9	745
140	20	10	746
141	67	5	751
141	64	6	752
141	52	7	753
141	51	8	754
142	82	5	759
143	81	2	763
143	109	4	765
147	46	1	786
143	49	5	766
147	80	2	787
149	20	1	792
148	20	5	794
150	108	1	795
150	113	2	796
148	38	4	791
151	38	4	799
161	20	1	846
161	48	2	847
148	89	2	790
151	89	2	798
140	89	2	740
141	89	2	748
134	37	3	707
135	37	3	714
136	37	3	719
137	37	3	724
138	37	3	729
134	81	1	711
135	81	1	715
136	81	1	720
137	81	1	725
138	81	1	730
142	89	2	758
144	89	2	773
134	89	2	705
135	89	2	712
136	89	2	717
137	89	2	722
138	89	2	727
148	90	3	789
151	90	3	800
140	90	3	739
141	55	8	750
142	55	8	761
144	55	8	775
141	72	7	749
142	72	7	760
143	72	7	767
144	72	7	774
162	20	1	848
162	30	2	849
163	29	1	850
163	82	2	851
163	72	3	852
163	48	4	853
163	52	5	854
164	89	3	855
164	21	4	857
164	81	6	858
164	90	2	859
165	42	1	861
165	113	2	862
166	20	1	863
166	29	2	864
166	82	3	865
140	120	4	738
144	120	4	770
142	90	3	757
144	90	3	772
152	109	2	803
152	66	3	804
152	49	4	805
152	72	5	806
152	82	6	807
153	89	2	809
154	21	1	810
154	89	2	811
154	20	4	813
154	29	5	814
154	82	6	815
155	45	1	816
155	44	2	817
155	42	3	818
155	47	4	819
155	46	5	820
155	48	6	821
156	82	6	823
156	66	3	824
156	109	2	825
156	72	5	826
156	49	4	827
140	33	2	744
157	33	2	829
157	74	1	830
158	90	2	832
158	89	3	833
158	21	4	834
158	81	6	836
159	54	1	837
159	80	2	838
160	21	1	840
160	89	2	841
160	20	4	843
160	29	5	844
160	82	6	845
167	35	1	866
168	35	3	869
169	21	1	870
169	86	2	871
169	90	6	875
169	89	7	876
169	38	8	877
170	21	1	878
170	86	2	879
170	44	4	881
170	50	5	882
170	38	8	885
170	33	10	887
171	21	1	888
171	86	2	889
171	33	5	892
171	72	6	893
172	20	1	894
172	86	2	895
172	50	3	896
173	20	1	897
173	86	2	898
173	47	3	899
174	20	1	900
174	42	3	902
175	80	1	903
175	42	2	904
175	47	3	905
175	46	4	906
175	48	5	907
175	84	6	908
175	74	7	909
175	49	8	910
175	40	9	911
178	116	1	913
178	33	2	914
178	68	3	915
178	82	4	916
178	112	5	917
178	38	6	918
178	80	7	919
179	24	2	921
179	82	3	922
179	38	4	923
179	49	5	924
179	58	6	925
179	33	7	926
179	40	8	927
180	20	1	928
180	88	2	929
180	48	3	930
181	21	1	931
181	86	2	932
181	37	3	933
181	121	4	934
181	89	6	936
181	33	7	937
181	40	8	938
182	74	1	939
183	45	1	940
183	53	2	941
183	42	3	942
183	44	4	943
183	50	5	944
183	37	6	945
183	71	7	946
183	75	8	947
183	86	9	948
183	47	10	949
183	21	11	950
183	81	13	952
183	85	15	954
183	84	16	955
183	73	17	956
183	80	19	958
183	24	20	959
183	46	21	960
183	35	22	961
183	68	24	963
183	58	25	964
183	66	26	965
183	82	27	966
183	49	28	967
183	38	29	968
183	72	30	969
183	55	31	970
183	74	32	971
183	40	33	972
183	33	34	973
183	63	35	974
183	29	36	975
183	54	37	976
183	20	38	977
183	48	39	978
183	76	40	979
183	39	41	980
183	70	42	981
183	30	43	982
183	67	44	983
183	57	45	984
183	64	46	985
183	56	47	986
183	52	48	987
183	51	49	988
183	69	50	989
184	104	1	990
184	105	2	991
184	106	3	992
184	45	4	993
184	92	5	994
184	119	6	995
184	53	7	996
184	97	8	997
184	107	9	998
184	42	10	999
184	44	11	1000
184	50	12	1001
184	37	13	1002
184	71	14	1003
184	75	15	1004
184	86	16	1005
184	108	17	1006
184	118	18	1007
184	47	19	1008
184	21	20	1009
184	121	22	1011
184	81	24	1013
184	85	26	1015
184	84	27	1016
184	73	28	1017
184	120	30	1019
184	80	31	1020
184	24	32	1021
184	46	33	1022
184	113	34	1023
184	35	36	1025
184	90	38	1027
184	109	39	1028
184	89	40	1029
184	68	41	1030
184	58	42	1031
184	66	43	1032
184	82	44	1033
184	49	45	1034
184	103	46	1035
184	110	47	1036
184	38	48	1037
184	72	49	1038
184	55	50	1039
184	74	51	1040
184	112	52	1041
184	40	53	1042
184	116	54	1043
184	111	55	1044
184	33	56	1045
184	63	57	1046
184	29	58	1047
184	96	59	1048
184	54	60	1049
184	20	61	1050
184	48	62	1051
184	88	63	1052
184	76	64	1053
184	39	65	1054
184	70	66	1055
184	30	67	1056
184	67	68	1057
184	57	69	1058
184	64	70	1059
184	56	71	1060
184	52	72	1061
184	102	73	1062
184	117	74	1063
184	51	75	1064
184	69	76	1065
184	95	77	1066
184	93	78	1067
184	94	79	1068
185	81	1	1069
185	85	2	1070
185	84	3	1071
185	80	4	1072
185	82	5	1073
186	42	1	1074
186	33	2	1075
186	20	3	1076
149	34	2	793
140	34	2	743
141	34	2	747
134	34	2	710
136	34	2	718
137	34	2	723
143	34	2	762
188	45	2	1084
188	34	3	1085
189	45	1	1086
189	42	2	1087
189	47	3	1088
189	46	4	1089
189	48	5	1090
144	34	2	768
138	34	2	728
164	34	2	856
158	34	2	835
169	34	2	872
170	34	2	880
171	34	2	890
183	34	2	951
184	34	2	1012
187	34	2	1077
144	36	3	769
170	36	3	883
183	36	3	953
184	36	3	1014
187	36	3	1079
142	41	4	755
143	41	4	764
168	41	4	868
169	41	4	873
170	41	4	884
179	41	4	920
183	41	4	957
184	41	4	1018
187	41	4	1080
159	78	5	839
183	78	5	962
184	78	5	1026
187	78	5	1081
148	87	6	788
151	87	6	801
142	87	6	756
134	87	6	704
136	87	6	721
137	87	6	726
138	87	6	731
144	87	6	771
164	87	6	860
152	87	6	802
153	87	6	808
154	87	6	812
156	87	6	828
158	87	6	831
160	87	6	842
168	87	6	867
169	87	6	874
170	87	6	886
171	87	6	891
174	87	6	901
175	87	6	912
181	87	6	935
184	87	6	1024
187	87	6	1082
184	115	1	1010
187	115	1	1078
\.


--
-- TOC entry 3531 (class 0 OID 16423)
-- Dependencies: 227
-- Data for Name: routes; Type: TABLE DATA; Schema: public; Owner: bestway
--

COPY public.routes (name, author_id, created_at, updated_at, duration, distance, id, type, city, is_custom, photo, json_data, is_publicated, description) FROM stdin;
Гастрономический маршрут	6	2025-10-08 14:50:41.838909	2025-10-08 14:50:41.838914	\N	\N	134	CAR	PERM	f	\N	null	f	\N
Гастрономический маршрут	39	2025-10-08 14:50:41.838909	2025-10-08 14:50:41.838914	\N	\N	135	CAR	PERM	f	\N	null	f	\N
Гастрономический маршрут	6	2025-10-08 14:50:41.838909	2025-10-08 14:50:41.838914	\N	\N	136	CAR	PERM	f	\N	null	f	\N
Гастрономический маршрут	6	2025-10-08 14:50:41.838909	2025-10-08 14:50:41.838914	\N	\N	137	CAR	PERM	f	\N	null	f	\N
Гастрономический маршрут	39	2025-10-08 14:50:41.838909	2025-10-08 14:50:41.838914	\N	\N	138	MIXED	PERM	f	\N	null	f	\N
Тест прокси	6	2026-02-23 10:18:55.693755	2026-02-23 10:18:55.693785	\N	\N	140	MIXED	PERM	f	\N	null	f	\N
Тест после токенов	6	2026-02-24 16:39:29.35901	2026-02-24 16:39:29.359017	\N	\N	141	MIXED	PERM	f	\N	null	f	\N
Маршрут по топовым местам Перми	6	2026-02-24 16:58:03.562459	2026-02-24 16:58:03.562465	\N	\N	142	MIXED	PERM	f	\N	null	f	\N
Тест нового токена	6	2026-02-28 13:19:02.61815	2026-02-28 13:19:02.618155	\N	\N	143	MIXED	PERM	f	\N	null	f	\N
Тест нового токена 2	6	2026-02-28 13:30:25.549268	2026-02-28 13:30:25.549278	\N	\N	144	MIXED	PERM	f	\N	null	f	\N
Прогулка	50	2026-03-05 16:01:28.799707	2026-03-05 16:01:28.799711	\N	\N	147	MIXED	PERM	f	\N	null	f	\N
Прогулка	51	2026-03-05 16:01:54.816801	2026-03-05 16:01:54.816804	\N	\N	148	MIXED	PERM	f	\N	null	f	\N
Прогулка	50	2026-03-05 16:03:44.394674	2026-03-05 16:03:44.394679	\N	\N	149	MIXED	PERM	f	\N	null	f	\N
Прогулка	52	2026-03-05 16:11:36.25718	2026-03-05 16:11:36.257183	\N	\N	150	MIXED	PERM	f	\N	null	f	\N
Прогулка	6	2026-03-05 16:01:54.816801	2026-03-05 16:01:54.816804	\N	\N	151	MIXED	PERM	f	\N	null	f	\N
Тест гпт5	6	2026-03-06 08:42:40.775256	2026-03-06 08:42:40.775259	\N	\N	152	MIXED	PERM	f	\N	null	f	\N
Тест после починки промпта	6	2026-03-06 09:00:15.441981	2026-03-06 09:00:15.441986	\N	\N	153	MIXED	PERM	f	\N	null	f	\N
Тест после починки промпта 2	6	2026-03-06 09:03:23.960897	2026-03-06 09:03:23.960902	\N	\N	154	MIXED	PERM	f	\N	null	f	\N
Тест ручного	6	2026-03-06 09:10:39.859442	2026-03-06 09:10:39.859447	\N	\N	155	MIXED	PERM	f	\N	null	f	\N
Тест гпт5	6	2026-03-06 08:42:40.775256	2026-03-06 08:42:40.775259	\N	\N	156	MIXED	PERM	f	\N	null	f	\N
Отдых	53	2026-03-07 07:47:28.803973	2026-03-07 07:47:28.803978	\N	\N	157	MIXED	PERM	f	\N	null	f	\N
Тест генерации свободного	6	2026-03-07 08:59:32.213861	2026-03-07 08:59:32.213865	\N	\N	158	MIXED	PERM	f	\N	null	f	\N
Тест	6	2026-03-07 11:48:57.271229	2026-03-07 11:48:57.271234	\N	\N	159	MIXED	PERM	f	\N	null	f	\N
Тест	6	2026-03-07 11:51:53.204663	2026-03-07 11:51:53.204666	\N	\N	160	MIXED	PERM	f	\N	null	f	\N
Описание вкр	54	2026-03-09 12:06:49.273315	2026-03-09 12:06:49.27332	\N	\N	161	MIXED	PERM	f	\N	null	f	\N
лаомтк	54	2026-03-09 12:08:44.293883	2026-03-09 12:08:44.293887	\N	\N	162	MIXED	PERM	f	\N	null	f	\N
Исторический маршрут	55	2026-03-10 12:53:43.512039	2026-03-10 12:53:43.512043	\N	\N	163	MIXED	PERM	f	\N	null	f	\N
Тест генерации свободного	50	2026-03-07 08:59:32.213861	2026-03-07 08:59:32.213865	\N	\N	164	MIXED	PERM	f	\N	null	f	\N
Тест	50	2026-03-12 07:33:54.541409	2026-03-12 07:33:54.541414	\N	\N	165	MIXED	PERM	f	\N	null	f	\N
е5пп	57	2026-03-16 07:21:43.402675	2026-03-16 07:21:43.40268	\N	\N	166	MIXED	PERM	f	\N	null	f	\N
Куда-то 	58	2026-03-24 08:46:13.477655	2026-03-24 08:46:13.47766	\N	\N	167	MIXED	PERM	f	\N	null	f	\N
Кудато	58	2026-03-24 08:48:24.852555	2026-03-24 08:48:24.85256	\N	\N	168	MIXED	PERM	f	\N	null	f	\N
тест 8	6	2026-03-29 17:53:41.758454	2026-03-29 17:53:41.758454	\N	\N	169	MIXED	PERM	f	\N	null	f	\N
Тест	6	2026-03-29 19:21:39.007056	2026-03-29 19:21:39.007056	\N	\N	170	MIXED	PERM	f	\N	null	f	\N
Тест	6	2026-03-29 19:33:05.41237	2026-03-29 19:33:05.41237	\N	\N	171	MIXED	PERM	f	\N	null	f	\N
Частичная генерация	6	2026-03-30 10:26:29.735062	2026-03-30 10:26:29.735066	\N	\N	172	MIXED	PERM	f	\N	null	f	\N
Тест ручного 2	6	2026-03-30 10:38:12.037966	2026-03-30 10:38:12.037969	\N	\N	173	MIXED	PERM	f	\N	null	f	\N
Тест ручного 2	6	2026-03-30 15:53:28.150855	2026-03-30 15:53:28.150855	\N	\N	174	MIXED	PERM	f	\N	null	f	\N
Тест через агентов	6	2026-03-30 11:20:47.863506	2026-03-30 11:20:47.863509	\N	\N	175	MIXED	PERM	f	\N	null	f	\N
Тест ручного 3	6	2026-03-30 11:38:46.230811	2026-03-30 11:38:46.230816	\N	\N	178	MIXED	PERM	f	\N	null	f	\N
Тест ручного 2	6	2026-03-31 00:13:36.270603	2026-03-31 00:13:36.270603	\N	\N	179	MIXED	PERM	f	\N	null	f	\N
Тест ручного 2	6	2026-03-31 00:16:50.095473	2026-03-31 00:16:50.095473	\N	\N	180	MIXED	PERM	f	\N	null	f	\N
Башня смерти	6	2026-03-31 00:20:45.643877	2026-03-31 00:20:45.643877	\N	\N	181	MIXED	PERM	f	\N	null	f	\N
Тест ручного 5	6	2026-03-30 19:30:58.414869	2026-03-30 19:30:58.414872	\N	\N	182	MIXED	PERM	f	\N	null	f	\N
Тест авто 5	6	2026-03-30 19:32:47.377056	2026-03-30 19:32:47.37706	\N	\N	183	MIXED	PERM	f	\N	null	f	\N
Жесткий тест	6	2026-03-30 19:46:53.194755	2026-03-30 19:46:53.194759	\N	\N	184	MIXED	PERM	f	\N	null	f	\N
BestWay	6	2026-03-31 11:12:29.942579	2026-03-31 11:12:29.942584	\N	\N	185	MIXED	PERM	f	\N	null	f	\N
Тест ручного	6	2026-03-31 11:14:50.610529	2026-03-31 11:14:50.610533	\N	\N	186	MIXED	PERM	f	\N	null	f	\N
Прогулка по Перми	44	2026-04-03 12:42:38.412928	2026-04-04 06:20:21.931008	\N	\N	187	MIXED	PERM	f	\N	null	f	\N
Экскурсия для подруги	6	2026-04-04 07:16:20.984983	2026-04-04 07:16:20.984987	\N	\N	188	MIXED	PERM	f	\N	null	f	\N
Тест 2	6	2026-04-08 07:15:11.668311	2026-04-08 07:15:11.668315	\N	\N	189	MIXED	PERM	f	\N	null	f	\N
\.


--
-- TOC entry 3533 (class 0 OID 16433)
-- Dependencies: 229
-- Data for Name: surveys; Type: TABLE DATA; Schema: public; Owner: bestway
--

COPY public.surveys (name, author_id, created_at, updated_at, status, data, id, city, places, prompt) FROM stdin;
Тест ручного 2	6	2026-03-30 10:37:42.648683	2026-03-30 10:37:43.045227	DRAFT	{"questions": {"\\u0427\\u0442\\u043e \\u0434\\u043b\\u044f \\u0432\\u0430\\u0441 \\u0432\\u0430\\u0436\\u043d\\u0435\\u0435?": ""}, "preferred_transport": "\\u041d\\u0430 \\u0430\\u0432\\u0442\\u043e\\u0431\\u0443\\u0441\\u0435", "order_matters": false}	273	PERM	{"1": {"place_id": 20}, "2": {"category": "\\u0413\\u0430\\u043b\\u0435\\u0440\\u0435\\u044f", "type": null, "description": "\\u0421\\u043e\\u0432\\u0440\\u0435\\u043c\\u0435\\u043d\\u043d\\u043e\\u0433\\u043e \\u0438\\u0441\\u043a\\u0443\\u0441\\u0441\\u0442\\u0432\\u0430"}, "3": {"category": null, "type": null, "description": "\\u0421\\u0430\\u043c\\u043e\\u0435 \\u043b\\u0443\\u0447\\u0448\\u0435\\u0435 \\u043a\\u0430\\u0444\\u0435"}}	\N
Тест ручного 2	6	2026-03-30 10:37:42.648683	2026-03-30 10:37:43.045227	DRAFT	{"questions": {"\\u0427\\u0442\\u043e \\u0434\\u043b\\u044f \\u0432\\u0430\\u0441 \\u0432\\u0430\\u0436\\u043d\\u0435\\u0435?": ""}, "preferred_transport": "\\u041d\\u0430 \\u0430\\u0432\\u0442\\u043e\\u0431\\u0443\\u0441\\u0435", "order_matters": false}	274	PERM	{"1": {"place_id": 20}, "2": {"category": "\\u0413\\u0430\\u043b\\u0435\\u0440\\u0435\\u044f", "type": null, "description": "\\u0421\\u043e\\u0432\\u0440\\u0435\\u043c\\u0435\\u043d\\u043d\\u043e\\u0433\\u043e \\u0438\\u0441\\u043a\\u0443\\u0441\\u0441\\u0442\\u0432\\u0430"}, "3": {"category": null, "type": null, "description": "\\u0421\\u0430\\u043c\\u043e\\u0435 \\u043b\\u0443\\u0447\\u0448\\u0435\\u0435 \\u043a\\u0430\\u0444\\u0435"}}	\N
Тест ручного 2	6	2026-03-30 10:37:42.648683	2026-03-30 10:37:43.045227	DRAFT	{"questions": {"\\u0427\\u0442\\u043e \\u0434\\u043b\\u044f \\u0432\\u0430\\u0441 \\u0432\\u0430\\u0436\\u043d\\u0435\\u0435?": ""}, "preferred_transport": "\\u041d\\u0430 \\u0430\\u0432\\u0442\\u043e\\u0431\\u0443\\u0441\\u0435", "order_matters": false}	275	PERM	{"1": {"place_id": 20}, "2": {"category": "\\u0413\\u0430\\u043b\\u0435\\u0440\\u0435\\u044f", "type": null, "description": "\\u0421\\u043e\\u0432\\u0440\\u0435\\u043c\\u0435\\u043d\\u043d\\u043e\\u0433\\u043e \\u0438\\u0441\\u043a\\u0443\\u0441\\u0441\\u0442\\u0432\\u0430"}, "3": {"category": null, "type": null, "description": "\\u0421\\u0430\\u043c\\u043e\\u0435 \\u043b\\u0443\\u0447\\u0448\\u0435\\u0435 \\u043a\\u0430\\u0444\\u0435"}}	\N
Тест ручного 2	6	2026-03-30 10:37:42.648683	2026-03-30 10:37:43.045227	DRAFT	{"questions": {"\\u0427\\u0442\\u043e \\u0434\\u043b\\u044f \\u0432\\u0430\\u0441 \\u0432\\u0430\\u0436\\u043d\\u0435\\u0435?": ""}, "preferred_transport": "\\u041d\\u0430 \\u0430\\u0432\\u0442\\u043e\\u0431\\u0443\\u0441\\u0435", "order_matters": false}	276	PERM	{"1": {"place_id": 20}, "2": {"category": "\\u0413\\u0430\\u043b\\u0435\\u0440\\u0435\\u044f", "type": null, "description": "\\u0421\\u043e\\u0432\\u0440\\u0435\\u043c\\u0435\\u043d\\u043d\\u043e\\u0433\\u043e \\u0438\\u0441\\u043a\\u0443\\u0441\\u0441\\u0442\\u0432\\u0430"}, "3": {"category": null, "type": null, "description": "\\u0421\\u0430\\u043c\\u043e\\u0435 \\u043b\\u0443\\u0447\\u0448\\u0435\\u0435 \\u043a\\u0430\\u0444\\u0435"}}	\N
Отдых	53	2026-03-07 07:47:08.089043	2026-03-07 07:47:08.458148	DRAFT	{"questions": {"\\u0427\\u0442\\u043e \\u0434\\u043b\\u044f \\u0432\\u0430\\u0441 \\u0432\\u0430\\u0436\\u043d\\u0435\\u0435?": "\\u041a\\u043e\\u043c\\u0444\\u043e\\u0440\\u0442"}, "preferred_transport": "\\u041f\\u0435\\u0448\\u043a\\u043e\\u043c", "order_matters": true}	239	PERM	{"1": {"place_id": 33}, "2": {"place_id": 74}}	Сформируй маршрут по церкви двум кафе и ключевым Пермским достопремичательностям
Тест	50	2026-03-12 07:32:49.219802	2026-03-12 07:32:49.943677	DRAFT	{"questions": {"\\u0427\\u0442\\u043e \\u0434\\u043b\\u044f \\u0432\\u0430\\u0441 \\u0432\\u0430\\u0436\\u043d\\u0435\\u0435?": "\\u0421\\u043a\\u043e\\u0440\\u043e\\u0441\\u0442\\u044c"}, "preferred_transport": "\\u041f\\u0435\\u0448\\u043a\\u043e\\u043c", "order_matters": true}	247	PERM	{"1": {"place_id": 42}, "2": {"category": "\\u0414\\u0440\\u0430\\u0439\\u0432", "type": "\\u0411\\u0430\\u0440", "description": null}}	Сформируй маршрут по церкви двум кафе и ключевым Пермским достопремичательностям
\.


--
-- TOC entry 3535 (class 0 OID 16440)
-- Dependencies: 231
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: bestway
--

COPY public.users (id, phone, first_name, last_name, middle_name, registration_date, is_banned, is_admin, photo, description, gender, birth_date) FROM stdin;
37	75555555555	данные	мои	держите	2025-07-13 13:49:30.52197	f	f	\N	\N	MALE	1971-07-07
38	77777777777	2	1	Сайта	2025-07-13 13:54:28.346813	f	f	\N	\N	MALE	1977-07-13
40	74444444444	имя	фамилия	от	2025-07-13 16:05:52.324931	f	f	\N	\N	MALE	1950-07-04
53	79898709870	Витал	Альбертов	Олегович	2026-03-07 07:44:17.622619	f	f	\N	\N	MALE	2011-03-17
41	71233211231	Дмитрий	123	3	2025-07-27 13:58:19.685307	f	f	\N	\N	MALE	1973-07-03
42	70987654321	\N	\N	\N	2025-08-24 18:37:55.890546	f	f	\N	\N	MALE	\N
43	78912489990	Человек	Ахуенный	Генальевич	2025-08-25 11:31:52.449565	f	f	\N	\N	MALE	2003-08-01
44	79999999999	д	ЛФЛфлфл	д	2025-08-25 11:45:39.923048	f	f	\N	\N	MALE	\N
45	79985858585	llll	lllll	lllllll	2025-08-25 12:42:20.671577	f	f	\N	\N	MALE	1925-08-15
46	79043455456	Петя	Залупкин	Александрович	2025-08-25 13:24:01.438485	f	f	\N	\N	MALE	2007-08-01
36	72222222222	пользователя	тест	фыва	2025-07-13 13:45:49.682402	f	f	\N	\N	MALE	1990-07-04
54	79389779874	Олеся	Мик	Алек	2026-03-09 11:41:24.233614	f	f	\N	\N	MALE	2004-03-10
55	79528787543	Ола	Иои	Поуатл	2026-03-10 12:46:13.860987	f	f	\N	\N	MALE	2005-03-08
56	79519472899	\N	\N	\N	2026-03-12 07:28:25.818211	f	f	\N	\N	MALE	\N
57	79027911383	каукс	пуасп	асуа	2026-03-16 07:19:41.746442	f	f	\N	\N	MALE	\N
58	79641872553	Ирина	Петухова	Сергеевна	2026-03-24 08:43:58.416429	f	f	\N	\N	MALE	2004-08-23
6	79991263208	Аверьянов	Александр	Андреевич	2025-07-17 14:56:47.598614	f	t	media/users/users_31-08-2025_21-09-11.webp	string	MALE	2008-04-17
39	71111111111	Олег	Олегов	Олегович	2025-07-13 16:03:12.21895	f	f	media/users/users_14-09-2025_08-56-28.jpeg	\N	MALE	1997-09-27
47	79922018835	ыфвыфв	ыфвыв	ывыфвыф	2025-10-03 16:18:40.013481	f	f	\N	\N	MALE	\N
48	79824478937	2	1	3	2025-12-03 12:45:49.199546	f	f	\N	\N	MALE	1954-12-02
49	71234444444	2	1	3	2026-02-19 12:49:17.957716	f	f	\N	\N	MALE	\N
59	79255203654	Мария	Ш	Борисовна	2026-04-06 13:29:14.089979	f	f	\N	\N	MALE	1991-04-04
51	79504685476	Мария	Л	Олеговна	2026-03-05 15:43:45.261686	f	f	media/users/users_05-03-2026_15-47-57.jpg	\N	MALE	1987-03-13
50	79125915703	Анастасия	Зенина	Юрьевна	2026-03-05 15:43:23.154503	f	f	\N	\N	MALE	2003-11-02
52	79125915704	Анастасия 	Зенина 	Юрьевна	2026-03-05 16:09:03.150547	f	f	\N	\N	MALE	\N
\.


--
-- TOC entry 3552 (class 0 OID 0)
-- Dependencies: 216
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bestway
--

SELECT pg_catalog.setval('public.comments_id_seq', 72, true);


--
-- TOC entry 3553 (class 0 OID 0)
-- Dependencies: 218
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bestway
--

SELECT pg_catalog.setval('public.likes_id_seq', 79, true);


--
-- TOC entry 3554 (class 0 OID 0)
-- Dependencies: 220
-- Name: photos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bestway
--

SELECT pg_catalog.setval('public.photos_id_seq', 39, true);


--
-- TOC entry 3555 (class 0 OID 0)
-- Dependencies: 222
-- Name: places_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bestway
--

SELECT pg_catalog.setval('public.places_id_seq', 127, true);


--
-- TOC entry 3556 (class 0 OID 0)
-- Dependencies: 224
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bestway
--

SELECT pg_catalog.setval('public.posts_id_seq', 65, true);


--
-- TOC entry 3557 (class 0 OID 0)
-- Dependencies: 226
-- Name: route_places_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bestway
--

SELECT pg_catalog.setval('public.route_places_id_seq', 1090, true);


--
-- TOC entry 3558 (class 0 OID 0)
-- Dependencies: 228
-- Name: routes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bestway
--

SELECT pg_catalog.setval('public.routes_id_seq', 189, true);


--
-- TOC entry 3559 (class 0 OID 0)
-- Dependencies: 230
-- Name: surveys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bestway
--

SELECT pg_catalog.setval('public.surveys_id_seq', 285, true);


--
-- TOC entry 3560 (class 0 OID 0)
-- Dependencies: 232
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bestway
--

SELECT pg_catalog.setval('public.users_id_seq', 59, true);


--
-- TOC entry 3326 (class 2606 OID 16457)
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- TOC entry 3328 (class 2606 OID 16459)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 3330 (class 2606 OID 16461)
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- TOC entry 3332 (class 2606 OID 16463)
-- Name: photos photos_pkey; Type: CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_pkey PRIMARY KEY (id);


--
-- TOC entry 3336 (class 2606 OID 16465)
-- Name: places places_pkey; Type: CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.places
    ADD CONSTRAINT places_pkey PRIMARY KEY (id);


--
-- TOC entry 3340 (class 2606 OID 16467)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- TOC entry 3342 (class 2606 OID 16469)
-- Name: route_places route_places_pkey; Type: CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.route_places
    ADD CONSTRAINT route_places_pkey PRIMARY KEY (id);


--
-- TOC entry 3346 (class 2606 OID 16471)
-- Name: routes routes_pkey; Type: CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_pkey PRIMARY KEY (id);


--
-- TOC entry 3350 (class 2606 OID 16473)
-- Name: surveys surveys_pkey; Type: CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.surveys
    ADD CONSTRAINT surveys_pkey PRIMARY KEY (id);


--
-- TOC entry 3358 (class 2606 OID 16475)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3333 (class 1259 OID 16476)
-- Name: ix_places_city; Type: INDEX; Schema: public; Owner: bestway
--

CREATE INDEX ix_places_city ON public.places USING btree (city);


--
-- TOC entry 3334 (class 1259 OID 16477)
-- Name: ix_places_name; Type: INDEX; Schema: public; Owner: bestway
--

CREATE INDEX ix_places_name ON public.places USING btree (name);


--
-- TOC entry 3337 (class 1259 OID 16478)
-- Name: ix_posts_id; Type: INDEX; Schema: public; Owner: bestway
--

CREATE INDEX ix_posts_id ON public.posts USING btree (id);


--
-- TOC entry 3338 (class 1259 OID 16479)
-- Name: ix_posts_title; Type: INDEX; Schema: public; Owner: bestway
--

CREATE INDEX ix_posts_title ON public.posts USING btree (title);


--
-- TOC entry 3343 (class 1259 OID 16480)
-- Name: ix_routes_city; Type: INDEX; Schema: public; Owner: bestway
--

CREATE INDEX ix_routes_city ON public.routes USING btree (city);


--
-- TOC entry 3344 (class 1259 OID 16481)
-- Name: ix_routes_name; Type: INDEX; Schema: public; Owner: bestway
--

CREATE INDEX ix_routes_name ON public.routes USING btree (name);


--
-- TOC entry 3347 (class 1259 OID 16482)
-- Name: ix_surveys_city; Type: INDEX; Schema: public; Owner: bestway
--

CREATE INDEX ix_surveys_city ON public.surveys USING btree (city);


--
-- TOC entry 3348 (class 1259 OID 16483)
-- Name: ix_surveys_name; Type: INDEX; Schema: public; Owner: bestway
--

CREATE INDEX ix_surveys_name ON public.surveys USING btree (name);


--
-- TOC entry 3351 (class 1259 OID 16484)
-- Name: ix_users_first_name; Type: INDEX; Schema: public; Owner: bestway
--

CREATE INDEX ix_users_first_name ON public.users USING btree (first_name);


--
-- TOC entry 3352 (class 1259 OID 16485)
-- Name: ix_users_gender; Type: INDEX; Schema: public; Owner: bestway
--

CREATE INDEX ix_users_gender ON public.users USING btree (gender);


--
-- TOC entry 3353 (class 1259 OID 16486)
-- Name: ix_users_id; Type: INDEX; Schema: public; Owner: bestway
--

CREATE INDEX ix_users_id ON public.users USING btree (id);


--
-- TOC entry 3354 (class 1259 OID 16487)
-- Name: ix_users_last_name; Type: INDEX; Schema: public; Owner: bestway
--

CREATE INDEX ix_users_last_name ON public.users USING btree (last_name);


--
-- TOC entry 3355 (class 1259 OID 16488)
-- Name: ix_users_middle_name; Type: INDEX; Schema: public; Owner: bestway
--

CREATE INDEX ix_users_middle_name ON public.users USING btree (middle_name);


--
-- TOC entry 3356 (class 1259 OID 16489)
-- Name: ix_users_phone; Type: INDEX; Schema: public; Owner: bestway
--

CREATE UNIQUE INDEX ix_users_phone ON public.users USING btree (phone);


--
-- TOC entry 3359 (class 2606 OID 16490)
-- Name: comments comments_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3360 (class 2606 OID 16495)
-- Name: comments comments_place_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_place_id_fkey FOREIGN KEY (place_id) REFERENCES public.places(id) ON DELETE CASCADE;


--
-- TOC entry 3361 (class 2606 OID 16500)
-- Name: comments comments_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- TOC entry 3362 (class 2606 OID 16505)
-- Name: comments comments_route_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_route_id_fkey FOREIGN KEY (route_id) REFERENCES public.routes(id) ON DELETE CASCADE;


--
-- TOC entry 3363 (class 2606 OID 16510)
-- Name: likes likes_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3364 (class 2606 OID 16515)
-- Name: likes likes_place_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_place_id_fkey FOREIGN KEY (place_id) REFERENCES public.places(id) ON DELETE CASCADE;


--
-- TOC entry 3365 (class 2606 OID 16520)
-- Name: likes likes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- TOC entry 3366 (class 2606 OID 16525)
-- Name: likes likes_route_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_route_id_fkey FOREIGN KEY (route_id) REFERENCES public.routes(id) ON DELETE CASCADE;


--
-- TOC entry 3367 (class 2606 OID 16530)
-- Name: photos photos_place_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_place_id_fkey FOREIGN KEY (place_id) REFERENCES public.places(id) ON DELETE CASCADE;


--
-- TOC entry 3368 (class 2606 OID 16535)
-- Name: photos photos_route_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_route_id_fkey FOREIGN KEY (route_id) REFERENCES public.routes(id) ON DELETE CASCADE;


--
-- TOC entry 3369 (class 2606 OID 16540)
-- Name: photos photos_uploaded_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.photos
    ADD CONSTRAINT photos_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3370 (class 2606 OID 16545)
-- Name: posts posts_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3371 (class 2606 OID 16550)
-- Name: posts posts_route_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_route_id_fkey FOREIGN KEY (route_id) REFERENCES public.routes(id) ON DELETE CASCADE;


--
-- TOC entry 3372 (class 2606 OID 16555)
-- Name: route_places route_places_place_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.route_places
    ADD CONSTRAINT route_places_place_id_fkey FOREIGN KEY (place_id) REFERENCES public.places(id);


--
-- TOC entry 3373 (class 2606 OID 16560)
-- Name: route_places route_places_route_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.route_places
    ADD CONSTRAINT route_places_route_id_fkey FOREIGN KEY (route_id) REFERENCES public.routes(id) ON DELETE CASCADE;


--
-- TOC entry 3374 (class 2606 OID 16565)
-- Name: routes routes_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 3375 (class 2606 OID 16570)
-- Name: surveys surveys_author_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: bestway
--

ALTER TABLE ONLY public.surveys
    ADD CONSTRAINT surveys_author_id_fkey FOREIGN KEY (author_id) REFERENCES public.users(id);


-- Completed on 2026-05-04 18:10:31

--
-- PostgreSQL database dump complete
--

