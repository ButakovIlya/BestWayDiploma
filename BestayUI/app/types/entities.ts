/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

/** Body_add_photos_api_admin_places__place_id__photos_add_post */
export interface BodyAddPhotosApiAdminPlacesPlaceIdPhotosAddPost {
  /** Photos */
  photos?: File[] | null;
}

/** Body_add_photos_api_admin_routes__route_id__photos_add_post */
export interface BodyAddPhotosApiAdminRoutesRouteIdPhotosAddPost {
  /** Photos */
  photos?: File[] | null;
}

/** Body_add_photos_api_public_routes__route_id__photos_add_post */
export interface BodyAddPhotosApiPublicRoutesRouteIdPhotosAddPost {
  /** Photos */
  photos?: File[] | null;
}

/** Body_create_api_admin_places__post */
export interface BodyCreateApiAdminPlacesPost {
  /** Name */
  name: string;
  /** Description */
  description?: string | null;
  category: PlaceCategory;
  city?: CityCategory | null;
  type?: PlaceType | null;
  /** Tags */
  tags?: string | null;
  /**
   * Coordinates
   * Введите координаты в формате: 15.5,14.6
   */
  coordinates?: string[] | null;
  /** Map Name */
  map_name?: string | null;
  /** Photo */
  photo?: File | null;
  /** Photos */
  photos?: File[] | null;
}

/** Body_create_api_admin_posts__post */
export interface BodyCreateApiAdminPostsPost {
  /** Title */
  title: string;
  /** Description */
  description?: string | null;
  /** Route Id */
  route_id: number;
  /** Photo */
  photo?: File | null;
  /** Photos */
  photos?: File[] | null;
}

/** Body_create_api_admin_routes__post */
export interface BodyCreateApiAdminRoutesPost {
  /** Name */
  name: string;
  city?: CityCategory | null;
  type?: RouteType | null;
}

/** Body_create_api_public_posts__post */
export interface BodyCreateApiPublicPostsPost {
  /** Title */
  title: string;
  /** Description */
  description?: string | null;
  /** Route Id */
  route_id: number;
  /** Photo */
  photo?: File | null;
  /** Photos */
  photos?: File[] | null;
}

/** Body_create_api_public_routes__post */
export interface BodyCreateApiPublicRoutesPost {
  /** Name */
  name: string;
  city?: CityCategory | null;
  type?: RouteType | null;
}

/** Body_update_avatar_api_admin_places__place_id__avatar_post */
export interface BodyUpdateAvatarApiAdminPlacesPlaceIdAvatarPost {
  /** Photo */
  photo?: File | null;
}

/** Body_update_avatar_api_admin_routes__route_id__avatar_post */
export interface BodyUpdateAvatarApiAdminRoutesRouteIdAvatarPost {
  /** Photo */
  photo?: File | null;
}

/** Body_update_avatar_api_public_routes__route_id__avatar_post */
export interface BodyUpdateAvatarApiPublicRoutesRouteIdAvatarPost {
  /** Photo */
  photo?: File | null;
}

/** Body_update_my_profile_photo_api_public_profile_photo_post */
export interface BodyUpdateMyProfilePhotoApiPublicProfilePhotoPost {
  /** Photo */
  photo?: File | null;
}

/**
 * ChangePhoneSmsPayloadDTO
 * DTO для передачи данных SMS для смены телефона.
 */
export interface ChangePhoneSmsPayloadDTO {
  /**
   * Phone
   * @example "79991234567"
   */
  phone?: string | null;
  /**
   * New Phone
   * @example "79991234567"
   */
  new_phone: string;
  /**
   * Code
   * @minLength 4
   * @maxLength 4
   * @pattern ^\d{4}$
   * @example "1234"
   */
  code: string;
}

/** CheckHealthSchema */
export interface CheckHealthSchema {
  /** Status */
  status: string;
}

/** CityCategory */
export enum CityCategory {
  ValueПермь = "Пермь",
  ValueМосква = "Москва",
}

/** CommentCreate */
export interface CommentCreate {
  /** Route Id */
  route_id?: number | null;
  /** Place Id */
  place_id?: number | null;
  /** Post Id */
  post_id?: number | null;
  /**
   * Comment
   * @minLength 1
   * @maxLength 250
   */
  comment: string;
}

/** CommentRead */
export interface CommentRead {
  /** Author Id */
  author_id: number;
  /** Route Id */
  route_id?: number | null;
  /** Place Id */
  place_id?: number | null;
  /** Post Id */
  post_id?: number | null;
  /**
   * Comment
   * @minLength 1
   * @maxLength 250
   */
  comment: string;
  /** Id */
  id: number;
  /** Timestamp */
  timestamp?: string | null;
  author?: UserRead | null;
}

/** CommentUpdateDTO */
export interface CommentUpdateDTO {
  /**
   * Comment
   * @minLength 1
   * @maxLength 250
   */
  comment: string;
}

/** FullUserUpdateDTO */
export interface FullUserUpdateDTO {
  /** First Name */
  first_name?: string | null;
  /** Last Name */
  last_name?: string | null;
  /** Middle Name */
  middle_name?: string | null;
  /** Description */
  description?: string | null;
  gender?: Gender | null;
  /** Birth Date */
  birth_date?: string | null;
  /** Email */
  email?: string | null;
  /** Is Banned */
  is_banned?: boolean | null;
  /** Is Admin */
  is_admin?: boolean | null;
}

/** Gender */
export enum Gender {
  ValueМужчина = "Мужчина",
  ValueЖенщина = "Женщина",
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** LikeCreate */
export interface LikeCreate {
  /** Route Id */
  route_id?: number | null;
  /** Place Id */
  place_id?: number | null;
  /** Post Id */
  post_id?: number | null;
}

/** LikeRead */
export interface LikeRead {
  /** Author Id */
  author_id?: number | null;
  /** Route Id */
  route_id?: number | null;
  /** Place Id */
  place_id?: number | null;
  /** Post Id */
  post_id?: number | null;
  /** Id */
  id: number;
  /** Timestamp */
  timestamp?: string | null;
}

/** MiniRouteSchema */
export interface MiniRouteSchema {
  /** Name */
  name: string;
  city?: CityCategory | null;
  type?: RouteType | null;
  /**
   * Is Publicated
   * @default false
   */
  is_publicated?: boolean;
  /** Description */
  description?: string | null;
  /** Id */
  id: number;
  /** Author Id */
  author_id: number;
  /** Duration */
  duration: number | null;
  /** Distance */
  distance: number | null;
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
}

/** ModelFieldValuesData */
export interface ModelFieldValuesData {
  /** Results */
  results: null[];
  /** Count */
  count: number;
  /** Next */
  next?: number | null;
  /** Previous */
  previous?: number | null;
}

/** PaginatedResponse[CommentRead] */
export interface PaginatedResponseCommentRead {
  /** Data */
  data: CommentRead[];
  /** Count */
  count: number;
  /** Page */
  page: number;
  /** Page Size */
  page_size: number;
  /** Total Pages */
  total_pages: number;
  /** Next */
  next?: string | null;
  /** Previous */
  previous?: string | null;
}

/** PaginatedResponse[LikeRead] */
export interface PaginatedResponseLikeRead {
  /** Data */
  data: LikeRead[];
  /** Count */
  count: number;
  /** Page */
  page: number;
  /** Page Size */
  page_size: number;
  /** Total Pages */
  total_pages: number;
  /** Next */
  next?: string | null;
  /** Previous */
  previous?: string | null;
}

/** PaginatedResponse[PlaceRead] */
export interface PaginatedResponsePlaceRead {
  /** Data */
  data: PlaceRead[];
  /** Count */
  count: number;
  /** Page */
  page: number;
  /** Page Size */
  page_size: number;
  /** Total Pages */
  total_pages: number;
  /** Next */
  next?: string | null;
  /** Previous */
  previous?: string | null;
}

/** PaginatedResponse[PostRead] */
export interface PaginatedResponsePostRead {
  /** Data */
  data: PostRead[];
  /** Count */
  count: number;
  /** Page */
  page: number;
  /** Page Size */
  page_size: number;
  /** Total Pages */
  total_pages: number;
  /** Next */
  next?: string | null;
  /** Previous */
  previous?: string | null;
}

/** PaginatedResponse[RouteRead] */
export interface PaginatedResponseRouteRead {
  /** Data */
  data: RouteRead[];
  /** Count */
  count: number;
  /** Page */
  page: number;
  /** Page Size */
  page_size: number;
  /** Total Pages */
  total_pages: number;
  /** Next */
  next?: string | null;
  /** Previous */
  previous?: string | null;
}

/** PaginatedResponse[SurveyRead] */
export interface PaginatedResponseSurveyRead {
  /** Data */
  data: SurveyRead[];
  /** Count */
  count: number;
  /** Page */
  page: number;
  /** Page Size */
  page_size: number;
  /** Total Pages */
  total_pages: number;
  /** Next */
  next?: string | null;
  /** Previous */
  previous?: string | null;
}

/** PaginatedResponse[UserDTO] */
export interface PaginatedResponseUserDTO {
  /** Data */
  data: UserDTO[];
  /** Count */
  count: number;
  /** Page */
  page: number;
  /** Page Size */
  page_size: number;
  /** Total Pages */
  total_pages: number;
  /** Next */
  next?: string | null;
  /** Previous */
  previous?: string | null;
}

/** PhotoRead */
export interface PhotoRead {
  /** Id */
  id: number;
  /** Url */
  url: string;
}

/** PlaceCategory */
export enum PlaceCategory {
  ValueРесторан = "Ресторан",
  ValueКофейня = "Кофейня",
  ValueМузей = "Музей",
  ValueДостопримечательности = "Достопримечательности",
  ValueИнстаМеста = "Инста-места",
  ValueГалерея = "Галерея",
  ValueТеатр = "Театр",
  ValueВодныеПроцедуры = "Водные процедуры",
  ValueГорнолыжныеКурорты = "Горнолыжные курорты",
  ValueМастерКлассы = "Мастер-классы",
  ValueДрайв = "Драйв",
  ValueРасслабиться = "Расслабиться",
  ValueЖаркаяНочь = "Жаркая ночь",
  ValueОтели = "Отели",
  ValueПрогуляться = "Прогуляться",
  ValueСобытия = "События",
  ValueДетям = "Детям",
  ValueЦирк = "Цирк",
}

/** PlaceInfo */
export interface PlaceInfo {
  /**
   * Place Id
   * ID места из БД
   */
  place_id?: number | null;
  /** Категория места */
  category?: PlaceCategory | null;
  /** Тип места */
  type?: PlaceType | null;
  /**
   * Description
   * Краткое описание
   */
  description?: string | null;
}

/** PlacePatch */
export interface PlacePatch {
  /** Name */
  name?: string | null;
  /** Website Url */
  website_url?: string | null;
  /** Description */
  description?: string | null;
  category?: PlaceCategory | null;
  city?: CityCategory | null;
  /** Object Id */
  object_id?: number | null;
  type?: PlaceType | null;
  /** Tags */
  tags?: string | null;
  /** Coordinates */
  coordinates?: number[] | null;
  /** Map Name */
  map_name?: string | null;
}

/** PlacePut */
export interface PlacePut {
  /** Name */
  name: string;
  /** Website Url */
  website_url?: string | null;
  /** Description */
  description?: string | null;
  category: PlaceCategory;
  city?: CityCategory;
  /** Object Id */
  object_id?: number | null;
  type?: PlaceType;
  /** Tags */
  tags?: string;
  /** Coordinates */
  coordinates?: number[];
  /** Map Name */
  map_name?: string;
}

/** PlaceRead */
export interface PlaceRead {
  /** Name */
  name: string;
  /** Website Url */
  website_url?: string | null;
  /** Description */
  description?: string | null;
  category: PlaceCategory;
  city?: CityCategory | null;
  /** Object Id */
  object_id?: number | null;
  type?: PlaceType | null;
  /** Tags */
  tags?: string | null;
  /** Coordinates */
  coordinates?: number[] | null;
  /** Map Name */
  map_name?: string | null;
  /** Id */
  id: number;
  /** Photo */
  photo?: string | null;
  /** Photos */
  photos?: PhotoRead[] | null;
}

/** PlaceType */
export enum PlaceType {
  ValueГрузинский = "Грузинский",
  ValueИтальянский = "Итальянский",
  ValueКофейняКафе = "Кофейня+кафе",
  ValueПростоКофейня = "Просто кофейня",
  ValueКраеведческий = "Краеведческий",
  ValueСовременноеИскусство = "Современное искусство",
  ValueВоенный = "Военный",
  ValueМемориальный = "Мемориальный",
  ValueИсторический = "Исторический",
  ValueИзвестныеЛичности = "Известные личности",
  ValueРетроАвтомобили = "Ретро-автомобили",
  ValueДетский = "Детский",
  ValueЭтнографический = "Этнографический",
  ValueТехнический = "Технический",
  ValueПланетарий = "Планетарий",
  ValueХудожественная = "Художественная",
  ValueЧастная = "Частная",
  ValueПермскихХудожников = "Пермских художников",
  ValueМюзикл = "Мюзикл",
  ValueДрама = "Драма",
  ValueБалет = "Балет",
  ValueМузыкальныйКонцерт = "Музыкальный концерт",
  ValueТеатрТеней = "Театр теней",
  ValueОпера = "Опера",
  ValueЭксцентрическаяКомедия = "Эксцентрическая комедия",
  ValueДетскийСпектакль = "Детский спектакль",
  ValueКомедия = "Комедия",
  ValueСовременнаяДраматургия = "Современная драматургия",
  ValueМультикультурность = "Мультикультурность",
  ValueДокументальность = "Документальность",
  ValueСказка = "Сказка",
  ValueСатира = "Сатира",
  ValueСпектакльПлакат = "Спектакль-плакат",
  ValueТермыБаниБассейны = "Термы/бани/бассейны",
  ValueГубаха = "Губаха",
  ValueТакман = "Такман",
  ValueЖебреи = "Жебреи",
  ValueГончарнаяМастерская = "Гончарная мастерская",
  ValueХудожественнаяМастерская = "Художественная мастерская",
  ValueЮвелирнаяМастерская = "Ювелирная мастерская",
  ValueКартинг = "Картинг",
  ValueВеревочныйПарк = "Веревочный парк",
  ValueМассаж = "Массаж",
  ValueСпа = "Спа",
  ValueКлуб = "Клуб",
  ValueБар = "Бар",
  Value1Звезды = "1 звезды",
  Value2Звезды = "2 звезды",
  Value3Звезды = "3 звезды",
  Value4Звезды = "4 звезды",
  Value5Звезды = "5 звезды",
  ValueПарк = "Парк",
  ValueСад = "Сад",
  ValueКонцерты = "Концерты",
  ValueСпектакли = "Спектакли",
  ValueЗоопарк = "Зоопарк",
  ValueФанпарк = "Фанпарк",
  ValueПланетарий1 = "Планетарий",
}

/** PostPatch */
export interface PostPatch {
  /** Title */
  title?: string | null;
  /** Description */
  description?: string | null;
  /** Route Id */
  route_id?: number | null;
}

/** PostPut */
export interface PostPut {
  /** Title */
  title: string;
  /** Description */
  description: string;
  /** Route Id */
  route_id: number;
}

/** PostRead */
export interface PostRead {
  /** Title */
  title: string;
  /** Description */
  description?: string | null;
  /** Id */
  id: number;
  /** Route Id */
  route_id: number;
  /** Author Id */
  author_id: number;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
  /** Photo */
  photo?: string | null;
  author?: UserRead | null;
  route?: RouteRead | null;
}

/** RouteGenerationMode */
export enum RouteGenerationMode {
  ValueСвободный = "Свободный",
  ValueЧастичный = "Частичный",
}

/** RoutePatchSchema */
export interface RoutePatchSchema {
  /** Name */
  name?: string | null;
  city?: CityCategory | null;
  type?: RouteType | null;
  /** Author */
  author?: number | null;
  /** Duration */
  duration?: number | null;
  /** Distance */
  distance?: number | null;
  /**
   * Is Publicated
   * @default false
   */
  is_publicated?: boolean | null;
  /** Description */
  description?: string | null;
}

/** RoutePlaceRead */
export interface RoutePlaceRead {
  /** Order */
  order: number;
  place: PlaceRead;
}

/** RoutePlacesOrderUpdateDTO */
export interface RoutePlacesOrderUpdateDTO {
  /** Order Dict */
  order_dict: Record<string, number>;
}

/** RouteRead */
export interface RouteRead {
  /** Name */
  name: string;
  city?: CityCategory | null;
  type?: RouteType | null;
  /**
   * Is Publicated
   * @default false
   */
  is_publicated?: boolean;
  /** Description */
  description?: string | null;
  /** Id */
  id: number;
  /** Author Id */
  author_id: number;
  /** Photo */
  photo: string | null;
  /** Duration */
  duration: number | null;
  /** Distance */
  distance: number | null;
  /** Created At */
  created_at?: string | null;
  /** Updated At */
  updated_at?: string | null;
  author?: UserRead | null;
  /** Photos */
  photos: PhotoRead[] | null;
  /** Places */
  places: RoutePlaceRead[];
  /** Yandex Maps Url */
  yandex_maps_url?: string | null;
}

/** RouteType */
export enum RouteType {
  ValueПешком = "Пешком",
  ValueНаАвтомобиле = "На автомобиле",
  ValueНаАвтобусе = "На автобусе",
  ValueНаСамокатеВелосипеде = "На самокате/велосипеде",
  ValueНаМашине = "На машине",
  ValueСмешанный = "Смешанный",
}

/**
 * SmsPayloadDTO
 * DTO для передачи данных SMS.
 */
export interface SmsPayloadDTO {
  /**
   * Phone
   * @example "79991234567"
   */
  phone: string;
  /**
   * Code
   * @minLength 4
   * @maxLength 4
   * @pattern ^\d{4}$
   * @example "1234"
   */
  code: string;
}

/**
 * SmsResponseDTO
 * DTO для ответа после отправки SMS.
 */
export interface SmsResponseDTO {
  /**
   * Message
   * @example "Код отправлен"
   */
  message: string;
}

/** SurveyCreateDTO */
export interface SurveyCreateDTO {
  /**
   * Name
   * @example "Опрос по предпочтениям"
   */
  name: string;
  /** @default "Пермь" */
  city?: CityCategory | null;
}

/** SurveyDTO */
export interface SurveyDTO {
  /** Name */
  name: string | null;
  city: CityCategory | null;
  /** Data */
  data: object | null;
  /** Prompt */
  prompt: string | null;
  /** Places */
  places: object | null;
  status: SurveyStatus | null;
  /** Id */
  id: number;
  /** Author Id */
  author_id: number;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

/** SurveyDataUpdateDTO */
export interface SurveyDataUpdateDTO {
  /**
   * Experience
   * Опыт пользователя
   */
  experience?: string | null;
  /**
   * Questions
   * Ответы на вопросы, до 2048 байт
   */
  questions?: Record<string, string> | null;
  /**
   * Preferences
   * Предпочтения пользователя
   */
  preferences?: string | null;
  /**
   * Предпочтительный транспорт
   * @default "Смешанный"
   */
  preferred_transport?: RouteType | null;
  /**
   * Places Count
   * Количество мест
   * @default 2
   */
  places_count?: number | null;
  /**
   * Order Matters
   * Учитывается ли порядок посещения мест
   * @default false
   */
  order_matters?: boolean | null;
}

/** SurveyRead */
export interface SurveyRead {
  /** Name */
  name: string;
  /** @default "Пермь" */
  city?: CityCategory | null;
  /** @default "Черновик" */
  status?: SurveyStatus | null;
  /** Data */
  data?: object | null;
  /** Places */
  places?: object | null;
  /** Id */
  id: number;
  /** Author Id */
  author_id: number;
  /**
   * Created At
   * @format date-time
   */
  created_at: string;
  /**
   * Updated At
   * @format date-time
   */
  updated_at: string;
}

/** SurveyStatus */
export enum SurveyStatus {
  ValueЧерновик = "Черновик",
  ValueГенерацияВПроцессе = "Генерация в процессе",
  ValueГенерацияЗавершенаУспешно = "Генерация завершена успешно",
  ValueГенерацияЗавершенаСОшибкой = "Генерация завершена с ошибкой",
}

/** SurveyUpdateDTO */
export interface SurveyUpdateDTO {
  /**
   * Name
   * @default "Анкета маршрута"
   */
  name?: string | null;
  /** @default "Пермь" */
  city?: CityCategory | null;
  data?: SurveyDataUpdateDTO | null;
  /** Prompt */
  prompt?: string | null;
  /** Places */
  places?: Record<string, PlaceInfo> | null;
}

/**
 * TokenDTO
 * DTO для ответа при успешной верификации кода.
 */
export interface TokenDTO {
  /**
   * Status
   * @default "ok"
   * @example "ok"
   */
  status?: string;
  /**
   * Access Token
   * @example "eyJhbGciOiJIUzI1N..."
   */
  access_token: string;
  /**
   * Refresh Token
   * @example "dGhpcyBpcyBhIHJlZnJlc2g..."
   */
  refresh_token: string;
  /**
   * Is New User
   * @default false
   * @example false
   */
  is_new_user?: boolean;
  /**
   * User Id
   * @example 1
   */
  user_id: number;
}

/** UserCreateDTO */
export interface UserCreateDTO {
  /** First Name */
  first_name?: string | null;
  /** Last Name */
  last_name?: string | null;
  /** Middle Name */
  middle_name?: string | null;
  /** Description */
  description?: string | null;
  gender?: Gender | null;
  /** Birth Date */
  birth_date?: string | null;
  /**
   * Phone
   * @minLength 10
   * @maxLength 15
   */
  phone: string;
  /**
   * Is Admin
   * @default false
   */
  is_admin?: boolean | null;
}

/** UserDTO */
export interface UserDTO {
  /** First Name */
  first_name?: string | null;
  /** Last Name */
  last_name?: string | null;
  /** Middle Name */
  middle_name?: string | null;
  /** Description */
  description?: string | null;
  /** @default "Мужчина" */
  gender?: Gender;
  /** Birth Date */
  birth_date?: string | null;
  /** Id */
  id: number;
  /** Phone */
  phone: string;
  /** Registration Date */
  registration_date?: string | null;
  /**
   * Is Banned
   * @default false
   */
  is_banned?: boolean;
  /**
   * Is Admin
   * @default false
   */
  is_admin?: boolean;
  /** Photo */
  photo?: string | null;
}

/** UserRead */
export interface UserRead {
  /** Id */
  id: number;
  /** Phone */
  phone: string;
  /** First Name */
  first_name?: string | null;
  /** Last Name */
  last_name?: string | null;
  /** Middle Name */
  middle_name?: string | null;
  /** Registration Date */
  registration_date?: string | null;
  /**
   * Is Banned
   * @default false
   */
  is_banned?: boolean;
  /**
   * Is Admin
   * @default false
   */
  is_admin?: boolean;
  /** Photo */
  photo?: string | null;
  /** Description */
  description?: string | null;
}

/** UserUpdateDTO */
export interface UserUpdateDTO {
  /** First Name */
  first_name?: string | null;
  /** Last Name */
  last_name?: string | null;
  /** Middle Name */
  middle_name?: string | null;
  /** Description */
  description?: string | null;
  gender?: Gender | null;
  /** Birth Date */
  birth_date?: string | null;
  /** Email */
  email?: string | null;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title BestWay
 * @version 0.1.0
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * @description Получить список пользователей с пагинацией
     *
     * @tags Users
     * @name ListUsersApiAdminUsersGet
     * @summary List Users
     * @request GET:/api/admin/users
     * @secure
     */
    listUsersApiAdminUsersGet: (
      query?: {
        /**
         * Page
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Page Size
         * @min 1
         * @max 100
         * @default 10
         */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedResponseUserDTO, HTTPValidationError>({
        path: `/api/admin/users`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name CreateUserApiAdminUsersPost
     * @summary Create User
     * @request POST:/api/admin/users
     * @secure
     */
    createUserApiAdminUsersPost: (
      data: UserCreateDTO,
      params: RequestParams = {},
    ) =>
      this.request<UserDTO, HTTPValidationError>({
        path: `/api/admin/users`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить данные профиля
     *
     * @tags Users
     * @name RetrieveUserApiAdminUsersUserIdGet
     * @summary Retrieve User
     * @request GET:/api/admin/users/{user_id}
     * @secure
     */
    retrieveUserApiAdminUsersUserIdGet: (
      userId: number,
      params: RequestParams = {},
    ) =>
      this.request<UserDTO, HTTPValidationError>({
        path: `/api/admin/users/${userId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name DeleteUserApiAdminUsersUserIdDelete
     * @summary Delete User
     * @request DELETE:/api/admin/users/{user_id}
     * @secure
     */
    deleteUserApiAdminUsersUserIdDelete: (
      userId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/admin/users/${userId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UpdateUserApiAdminUsersUserIdPut
     * @summary Update User
     * @request PUT:/api/admin/users/{user_id}
     * @secure
     */
    updateUserApiAdminUsersUserIdPut: (
      userId: number,
      data: FullUserUpdateDTO,
      params: RequestParams = {},
    ) =>
      this.request<UserDTO, HTTPValidationError>({
        path: `/api/admin/users/${userId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить список комментариев с пагинацией
     *
     * @tags Comments
     * @name ListCommentApiAdminCommentsGet
     * @summary List Comment
     * @request GET:/api/admin/comments/
     * @secure
     */
    listCommentApiAdminCommentsGet: (
      query?: {
        /**
         * Place Id
         * @min 1
         */
        place_id?: number;
        /**
         * Route Id
         * @min 1
         */
        route_id?: number;
        /**
         * Post Id
         * @min 1
         */
        post_id?: number;
        /**
         * Page
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Page Size
         * @min 1
         * @max 100
         * @default 10
         */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedResponseCommentRead, HTTPValidationError>({
        path: `/api/admin/comments/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить комментарий по ID
     *
     * @tags Comments
     * @name RetrieveCommentApiAdminCommentsCommentIdGet
     * @summary Retrieve Comment
     * @request GET:/api/admin/comments/{comment_id}
     * @secure
     */
    retrieveCommentApiAdminCommentsCommentIdGet: (
      commentId: number,
      params: RequestParams = {},
    ) =>
      this.request<CommentRead, HTTPValidationError>({
        path: `/api/admin/comments/${commentId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить комментарий
     *
     * @tags Comments
     * @name DeleteCommentApiAdminCommentsCommentIdDelete
     * @summary Delete Comment
     * @request DELETE:/api/admin/comments/{comment_id}
     * @secure
     */
    deleteCommentApiAdminCommentsCommentIdDelete: (
      commentId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/admin/comments/${commentId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Получить список лайков с пагинацией
     *
     * @tags Likes
     * @name ListLikesApiAdminLikesGet
     * @summary List Likes
     * @request GET:/api/admin/likes/
     * @secure
     */
    listLikesApiAdminLikesGet: (
      query?: {
        /**
         * Place Id
         * @min 1
         */
        place_id?: number;
        /**
         * Route Id
         * @min 1
         */
        route_id?: number;
        /**
         * Post Id
         * @min 1
         */
        post_id?: number;
        /**
         * Page
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Page Size
         * @min 1
         * @max 100
         * @default 10
         */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedResponseLikeRead, HTTPValidationError>({
        path: `/api/admin/likes/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить лайк по ID
     *
     * @tags Likes
     * @name RetrieveLikeApiAdminLikesLikeIdGet
     * @summary Retrieve Like
     * @request GET:/api/admin/likes/{like_id}
     * @secure
     */
    retrieveLikeApiAdminLikesLikeIdGet: (
      likeId: number,
      params: RequestParams = {},
    ) =>
      this.request<LikeRead, HTTPValidationError>({
        path: `/api/admin/likes/${likeId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить лайк
     *
     * @tags Likes
     * @name DeleteLikeApiAdminLikesLikeIdDelete
     * @summary Delete Like
     * @request DELETE:/api/admin/likes/{like_id}
     * @secure
     */
    deleteLikeApiAdminLikesLikeIdDelete: (
      likeId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/admin/likes/${likeId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Places
     * @name CreateApiAdminPlacesPost
     * @summary Create
     * @request POST:/api/admin/places/
     * @secure
     */
    createApiAdminPlacesPost: (
      data: BodyCreateApiAdminPlacesPost,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/admin/places/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить список мест
     *
     * @tags Places
     * @name ListPlacesApiAdminPlacesGet
     * @summary List Places
     * @request GET:/api/admin/places/
     * @secure
     */
    listPlacesApiAdminPlacesGet: (
      query?: {
        /**
         * Page
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Page Size
         * @min 1
         * @max 100
         * @default 10
         */
        page_size?: number;
        /** Name */
        name?: string | null;
        /**
         * City
         * @default "Пермь"
         */
        city?: CityCategory | null;
        /** Categories */
        categories?: string | null;
        /** Types */
        types?: string | null;
        /** Has Avatar */
        has_avatar?: boolean | null;
        /** Has Photos */
        has_photos?: boolean | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedResponsePlaceRead, HTTPValidationError>({
        path: `/api/admin/places/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Places
     * @name PatchApiAdminPlacesItemIdPatch
     * @summary Patch
     * @request PATCH:/api/admin/places/{item_id}
     * @secure
     */
    patchApiAdminPlacesItemIdPatch: (
      itemId: number,
      data: PlacePatch,
      params: RequestParams = {},
    ) =>
      this.request<PlaceRead, HTTPValidationError>({
        path: `/api/admin/places/${itemId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Places
     * @name PutApiAdminPlacesItemIdPut
     * @summary Put
     * @request PUT:/api/admin/places/{item_id}
     * @secure
     */
    putApiAdminPlacesItemIdPut: (
      itemId: number,
      data: PlacePut,
      params: RequestParams = {},
    ) =>
      this.request<PlaceRead, HTTPValidationError>({
        path: `/api/admin/places/${itemId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Places
     * @name UpdateAvatarApiAdminPlacesPlaceIdAvatarPost
     * @summary Update Avatar
     * @request POST:/api/admin/places/{place_id}/avatar
     * @secure
     */
    updateAvatarApiAdminPlacesPlaceIdAvatarPost: (
      placeId: number,
      data: BodyUpdateAvatarApiAdminPlacesPlaceIdAvatarPost,
      params: RequestParams = {},
    ) =>
      this.request<PlaceRead, HTTPValidationError>({
        path: `/api/admin/places/${placeId}/avatar`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Places
     * @name RemovePhotoApiAdminPlacesPlaceIdPhotosPhotoIdDeleteDelete
     * @summary Remove Photo
     * @request DELETE:/api/admin/places/{place_id}/photos/{photo_id}/delete
     * @secure
     */
    removePhotoApiAdminPlacesPlaceIdPhotosPhotoIdDeleteDelete: (
      placeId: number,
      photoId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/admin/places/${placeId}/photos/${photoId}/delete`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Places
     * @name AddPhotosApiAdminPlacesPlaceIdPhotosAddPost
     * @summary Add Photos
     * @request POST:/api/admin/places/{place_id}/photos/add
     * @secure
     */
    addPhotosApiAdminPlacesPlaceIdPhotosAddPost: (
      placeId: number,
      data: BodyAddPhotosApiAdminPlacesPlaceIdPhotosAddPost,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/admin/places/${placeId}/photos/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить значения для фильтров по 'field_name'
     *
     * @tags Places
     * @name GetFieldValuesApiAdminPlacesFieldValuesFieldNameGet
     * @summary Get Field Values
     * @request GET:/api/admin/places/field_values/{field_name}
     * @secure
     */
    getFieldValuesApiAdminPlacesFieldValuesFieldNameGet: (
      fieldName: string,
      query?: {
        /**
         * Per Page
         * @default 10
         */
        per_page?: number;
        /**
         * Page
         * @default 1
         */
        page?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ModelFieldValuesData, HTTPValidationError>({
        path: `/api/admin/places/field_values/${fieldName}`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить допустимые значения для поле по 'field_name'
     *
     * @tags Places
     * @name SelectFieldValuesApiAdminPlacesSelectFieldValuesFieldNameGet
     * @summary Select Field Values
     * @request GET:/api/admin/places/select_field_values/{field_name}
     * @secure
     */
    selectFieldValuesApiAdminPlacesSelectFieldValuesFieldNameGet: (
      fieldName: string,
      params: RequestParams = {},
    ) =>
      this.request<string[], HTTPValidationError>({
        path: `/api/admin/places/select_field_values/${fieldName}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить место по ID
     *
     * @tags Places
     * @name RetrievePlaceApiAdminPlacesPlaceIdGet
     * @summary Retrieve Place
     * @request GET:/api/admin/places/{place_id}
     * @secure
     */
    retrievePlaceApiAdminPlacesPlaceIdGet: (
      placeId: number,
      params: RequestParams = {},
    ) =>
      this.request<PlaceRead, HTTPValidationError>({
        path: `/api/admin/places/${placeId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить место
     *
     * @tags Places
     * @name DeletePlaceApiAdminPlacesPlaceIdDelete
     * @summary Delete Place
     * @request DELETE:/api/admin/places/{place_id}
     * @secure
     */
    deletePlaceApiAdminPlacesPlaceIdDelete: (
      placeId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/admin/places/${placeId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Routes
     * @name CreateApiAdminRoutesPost
     * @summary Create
     * @request POST:/api/admin/routes/
     * @secure
     */
    createApiAdminRoutesPost: (
      data: BodyCreateApiAdminRoutesPost,
      params: RequestParams = {},
    ) =>
      this.request<RouteRead, HTTPValidationError>({
        path: `/api/admin/routes/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить список маршрутов
     *
     * @tags Routes
     * @name ListRoutesApiAdminRoutesGet
     * @summary List Routes
     * @request GET:/api/admin/routes/
     * @secure
     */
    listRoutesApiAdminRoutesGet: (
      query?: {
        /**
         * Page
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Page Size
         * @min 1
         * @max 100
         * @default 10
         */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedResponseRouteRead, HTTPValidationError>({
        path: `/api/admin/routes/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Routes
     * @name AddRoutePlaceApiAdminRoutesRouteIdPlacesAddPlaceIdPost
     * @summary Add Route Place
     * @request POST:/api/admin/routes/{route_id}/places/add/{place_id}
     * @secure
     */
    addRoutePlaceApiAdminRoutesRouteIdPlacesAddPlaceIdPost: (
      routeId: number,
      placeId: number,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/admin/routes/${routeId}/places/add/${placeId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить место по id или удалить все, если ничего не передано
     *
     * @tags Routes
     * @name RemoveRoutePlaceApiAdminRoutesRouteIdPlacesRemoveDelete
     * @summary Remove Route Place
     * @request DELETE:/api/admin/routes/{route_id}/places/remove
     * @secure
     */
    removeRoutePlaceApiAdminRoutesRouteIdPlacesRemoveDelete: (
      routeId: number,
      query?: {
        /** Route Place Id */
        route_place_id?: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/admin/routes/${routeId}/places/remove`,
        method: "DELETE",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Routes
     * @name UpdateRoutePlacesOrderApiAdminRoutesRouteIdPlacesUpdateOrderPost
     * @summary Update Route Places Order
     * @request POST:/api/admin/routes/{route_id}/places/update_order
     * @secure
     */
    updateRoutePlacesOrderApiAdminRoutesRouteIdPlacesUpdateOrderPost: (
      routeId: number,
      data: RoutePlacesOrderUpdateDTO,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/admin/routes/${routeId}/places/update_order`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Routes
     * @name PatchApiAdminRoutesItemIdPatch
     * @summary Patch
     * @request PATCH:/api/admin/routes/{item_id}
     * @secure
     */
    patchApiAdminRoutesItemIdPatch: (
      itemId: number,
      data: RoutePatchSchema,
      params: RequestParams = {},
    ) =>
      this.request<MiniRouteSchema, HTTPValidationError>({
        path: `/api/admin/routes/${itemId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Routes
     * @name UpdateAvatarApiAdminRoutesRouteIdAvatarPost
     * @summary Update Avatar
     * @request POST:/api/admin/routes/{route_id}/avatar
     * @secure
     */
    updateAvatarApiAdminRoutesRouteIdAvatarPost: (
      routeId: number,
      data: BodyUpdateAvatarApiAdminRoutesRouteIdAvatarPost,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/admin/routes/${routeId}/avatar`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Routes
     * @name RemovePhotoApiAdminRoutesRouteIdPhotosPhotoIdDeleteDelete
     * @summary Remove Photo
     * @request DELETE:/api/admin/routes/{route_id}/photos/{photo_id}/delete
     * @secure
     */
    removePhotoApiAdminRoutesRouteIdPhotosPhotoIdDeleteDelete: (
      routeId: number,
      photoId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/admin/routes/${routeId}/photos/${photoId}/delete`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Routes
     * @name AddPhotosApiAdminRoutesRouteIdPhotosAddPost
     * @summary Add Photos
     * @request POST:/api/admin/routes/{route_id}/photos/add
     * @secure
     */
    addPhotosApiAdminRoutesRouteIdPhotosAddPost: (
      routeId: number,
      data: BodyAddPhotosApiAdminRoutesRouteIdPhotosAddPost,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/admin/routes/${routeId}/photos/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Routes
     * @name GenerateRouteApiAdminRoutesGenerateSurveyIdPost
     * @summary Generate Route
     * @request POST:/api/admin/routes/generate/{survey_id}
     * @secure
     */
    generateRouteApiAdminRoutesGenerateSurveyIdPost: (
      surveyId: number,
      query?: {
        /** @default "Свободный" */
        mode?: RouteGenerationMode;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/admin/routes/generate/${surveyId}`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить маршрут по ID
     *
     * @tags Routes
     * @name RetrieveRouteApiAdminRoutesRouteIdGet
     * @summary Retrieve Route
     * @request GET:/api/admin/routes/{route_id}
     * @secure
     */
    retrieveRouteApiAdminRoutesRouteIdGet: (
      routeId: number,
      params: RequestParams = {},
    ) =>
      this.request<RouteRead, HTTPValidationError>({
        path: `/api/admin/routes/${routeId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить маршрут
     *
     * @tags Routes
     * @name DeleteRouteApiAdminRoutesRouteIdDelete
     * @summary Delete Route
     * @request DELETE:/api/admin/routes/{route_id}
     * @secure
     */
    deleteRouteApiAdminRoutesRouteIdDelete: (
      routeId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/admin/routes/${routeId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Получить список опросов
     *
     * @tags Surveys
     * @name ListSurveysApiAdminSurveysGet
     * @summary List Surveys
     * @request GET:/api/admin/surveys/
     * @secure
     */
    listSurveysApiAdminSurveysGet: (
      query?: {
        /**
         * Page
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Page Size
         * @min 1
         * @max 100
         * @default 10
         */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedResponseSurveyRead, HTTPValidationError>({
        path: `/api/admin/surveys/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить опрос по ID
     *
     * @tags Surveys
     * @name RetrieveSurveyApiAdminSurveysSurveyIdGet
     * @summary Retrieve Survey
     * @request GET:/api/admin/surveys/{survey_id}
     * @secure
     */
    retrieveSurveyApiAdminSurveysSurveyIdGet: (
      surveyId: number,
      params: RequestParams = {},
    ) =>
      this.request<SurveyRead, HTTPValidationError>({
        path: `/api/admin/surveys/${surveyId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить опрос
     *
     * @tags Surveys
     * @name DeleteSurveyApiAdminSurveysSurveyIdDelete
     * @summary Delete Survey
     * @request DELETE:/api/admin/surveys/{survey_id}
     * @secure
     */
    deleteSurveyApiAdminSurveysSurveyIdDelete: (
      surveyId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/admin/surveys/${surveyId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Получить список постов
     *
     * @tags Posts
     * @name ListPostsApiAdminPostsAllGet
     * @summary List Posts
     * @request GET:/api/admin/posts/all
     * @secure
     */
    listPostsApiAdminPostsAllGet: (
      query?: {
        /**
         * Page
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Page Size
         * @min 1
         * @max 100
         * @default 10
         */
        page_size?: number;
        /** Title */
        title?: string | null;
        /** Description */
        description?: string | null;
        /** Route Name */
        route_name?: string | null;
        /**
         * City
         * @default "Пермь"
         */
        city?: CityCategory | null;
        /** Type */
        type?: RouteType | null;
        /** Places Count */
        places_count?: number | null;
        /** Places Gte */
        places_gte?: number | null;
        /** Places Lte */
        places_lte?: number | null;
        /** Has Avatar */
        has_avatar?: boolean | null;
        /** Has Photos */
        has_photos?: boolean | null;
        /** Is Custom */
        is_custom?: boolean | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedResponsePostRead, HTTPValidationError>({
        path: `/api/admin/posts/all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить пост по ID
     *
     * @tags Posts
     * @name RetrievePostApiAdminPostsAllPostIdGet
     * @summary Retrieve Post
     * @request GET:/api/admin/posts/all/{post_id}
     * @secure
     */
    retrievePostApiAdminPostsAllPostIdGet: (
      postId: number,
      params: RequestParams = {},
    ) =>
      this.request<PostRead, HTTPValidationError>({
        path: `/api/admin/posts/all/${postId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Posts
     * @name CreateApiAdminPostsPost
     * @summary Create
     * @request POST:/api/admin/posts/
     * @secure
     */
    createApiAdminPostsPost: (
      data: BodyCreateApiAdminPostsPost,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/admin/posts/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Posts
     * @name PatchApiAdminPostsItemIdPatch
     * @summary Patch
     * @request PATCH:/api/admin/posts/{item_id}
     * @secure
     */
    patchApiAdminPostsItemIdPatch: (
      itemId: number,
      data: PostPatch,
      params: RequestParams = {},
    ) =>
      this.request<PostRead, HTTPValidationError>({
        path: `/api/admin/posts/${itemId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Posts
     * @name PutApiAdminPostsItemIdPut
     * @summary Put
     * @request PUT:/api/admin/posts/{item_id}
     * @secure
     */
    putApiAdminPostsItemIdPut: (
      itemId: number,
      data: PostPut,
      params: RequestParams = {},
    ) =>
      this.request<PostRead, HTTPValidationError>({
        path: `/api/admin/posts/${itemId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить пост
     *
     * @tags Posts
     * @name DeletePostApiAdminPostsPostIdDelete
     * @summary Delete Post
     * @request DELETE:/api/admin/posts/{post_id}
     * @secure
     */
    deletePostApiAdminPostsPostIdDelete: (
      postId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/admin/posts/${postId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Health
     * @name CheckHealthApiPublicHealthGet
     * @summary Check Health
     * @request GET:/api/public/health
     * @secure
     */
    checkHealthApiPublicHealthGet: (params: RequestParams = {}) =>
      this.request<CheckHealthSchema, any>({
        path: `/api/public/health`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Health
     * @name CheckHealthAuthenticatedApiPublicHealthAuthGet
     * @summary Check Health Authenticated
     * @request GET:/api/public/health-auth
     * @secure
     */
    checkHealthAuthenticatedApiPublicHealthAuthGet: (
      params: RequestParams = {},
    ) =>
      this.request<CheckHealthSchema, any>({
        path: `/api/public/health-auth`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Эндпоинт для запроса кода по SMS.
     *
     * @tags Authorization
     * @name SendCodeApiPublicAuthSendCodeGet
     * @summary Send Code
     * @request GET:/api/public/auth/send-code
     * @secure
     */
    sendCodeApiPublicAuthSendCodeGet: (
      query: {
        /** Phone */
        phone: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<SmsResponseDTO, HTTPValidationError>({
        path: `/api/public/auth/send-code`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Эндпоинт для проверки кода из SMS.
     *
     * @tags Authorization
     * @name CheckCodeApiPublicAuthCheckCodePost
     * @summary Check Code
     * @request POST:/api/public/auth/check-code
     * @secure
     */
    checkCodeApiPublicAuthCheckCodePost: (
      data: SmsPayloadDTO,
      params: RequestParams = {},
    ) =>
      this.request<TokenDTO, HTTPValidationError>({
        path: `/api/public/auth/check-code`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Эндпоинт для запроса кода на смену телефона по SMS.
     *
     * @tags Authorization
     * @name SendPhoneChangeCodeApiPublicAuthSendPhoneChangeCodeGet
     * @summary Send Phone Change Code
     * @request GET:/api/public/auth/send-phone-change-code
     * @secure
     */
    sendPhoneChangeCodeApiPublicAuthSendPhoneChangeCodeGet: (
      params: RequestParams = {},
    ) =>
      this.request<SmsResponseDTO, any>({
        path: `/api/public/auth/send-phone-change-code`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Эндпоинт для проверки кода из SMS.
     *
     * @tags Authorization
     * @name CheckPhoneChangeCodeApiPublicAuthCheckChangePhoneCodePost
     * @summary Check Phone Change Code
     * @request POST:/api/public/auth/check-change-phone-code
     * @secure
     */
    checkPhoneChangeCodeApiPublicAuthCheckChangePhoneCodePost: (
      data: ChangePhoneSmsPayloadDTO,
      params: RequestParams = {},
    ) =>
      this.request<TokenDTO, HTTPValidationError>({
        path: `/api/public/auth/check-change-phone-code`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить данные профиля
     *
     * @tags Public Profile
     * @name GetMyProfileApiPublicProfileGet
     * @summary Get My Profile
     * @request GET:/api/public/profile
     * @secure
     */
    getMyProfileApiPublicProfileGet: (params: RequestParams = {}) =>
      this.request<UserDTO, any>({
        path: `/api/public/profile`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновить данные профиля
     *
     * @tags Public Profile
     * @name UpdateMyProfileApiPublicProfilePut
     * @summary Update My Profile
     * @request PUT:/api/public/profile
     * @secure
     */
    updateMyProfileApiPublicProfilePut: (
      data: UserUpdateDTO,
      params: RequestParams = {},
    ) =>
      this.request<UserDTO, HTTPValidationError>({
        path: `/api/public/profile`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Сменить фото профиля
     *
     * @tags Public Profile
     * @name UpdateMyProfilePhotoApiPublicProfilePhotoPost
     * @summary Update My Profile Photo
     * @request POST:/api/public/profile/photo
     * @secure
     */
    updateMyProfilePhotoApiPublicProfilePhotoPost: (
      data: BodyUpdateMyProfilePhotoApiPublicProfilePhotoPost,
      params: RequestParams = {},
    ) =>
      this.request<UserDTO, HTTPValidationError>({
        path: `/api/public/profile/photo`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить список мест
     *
     * @tags Public Places
     * @name ListPlacesApiPublicPlacesGet
     * @summary List Places
     * @request GET:/api/public/places/
     * @secure
     */
    listPlacesApiPublicPlacesGet: (
      query?: {
        /**
         * Page
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Page Size
         * @min 1
         * @max 100
         * @default 10
         */
        page_size?: number;
        /** Name */
        name?: string | null;
        /**
         * City
         * @default "Пермь"
         */
        city?: CityCategory | null;
        /** Categories */
        categories?: string | null;
        /** Types */
        types?: string | null;
        /** Has Avatar */
        has_avatar?: boolean | null;
        /** Has Photos */
        has_photos?: boolean | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedResponsePlaceRead, HTTPValidationError>({
        path: `/api/public/places/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить место по ID
     *
     * @tags Public Places
     * @name RetrievePlaceApiPublicPlacesPlaceIdGet
     * @summary Retrieve Place
     * @request GET:/api/public/places/{place_id}
     * @secure
     */
    retrievePlaceApiPublicPlacesPlaceIdGet: (
      placeId: number,
      params: RequestParams = {},
    ) =>
      this.request<PlaceRead, HTTPValidationError>({
        path: `/api/public/places/${placeId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public Routes
     * @name CreateApiPublicRoutesPost
     * @summary Create
     * @request POST:/api/public/routes/
     * @secure
     */
    createApiPublicRoutesPost: (
      data: BodyCreateApiPublicRoutesPost,
      params: RequestParams = {},
    ) =>
      this.request<RouteRead, HTTPValidationError>({
        path: `/api/public/routes/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.UrlEncoded,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public Routes
     * @name AddRoutePlaceApiPublicRoutesRouteIdPlacesAddPlaceIdPost
     * @summary Add Route Place
     * @request POST:/api/public/routes/{route_id}/places/add/{place_id}
     * @secure
     */
    addRoutePlaceApiPublicRoutesRouteIdPlacesAddPlaceIdPost: (
      routeId: number,
      placeId: number,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/public/routes/${routeId}/places/add/${placeId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить место по id или удалить все, если ничего не передано
     *
     * @tags Public Routes
     * @name RemoveRoutePlaceApiPublicRoutesRouteIdPlacesRemoveDelete
     * @summary Remove Route Place
     * @request DELETE:/api/public/routes/{route_id}/places/remove
     * @secure
     */
    removeRoutePlaceApiPublicRoutesRouteIdPlacesRemoveDelete: (
      routeId: number,
      query?: {
        /** Route Place Id */
        route_place_id?: number | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/public/routes/${routeId}/places/remove`,
        method: "DELETE",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public Routes
     * @name UpdateRoutePlacesOrderApiPublicRoutesRouteIdPlacesUpdateOrderPost
     * @summary Update Route Places Order
     * @request POST:/api/public/routes/{route_id}/places/update_order
     * @secure
     */
    updateRoutePlacesOrderApiPublicRoutesRouteIdPlacesUpdateOrderPost: (
      routeId: number,
      data: RoutePlacesOrderUpdateDTO,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/public/routes/${routeId}/places/update_order`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public Routes
     * @name PatchApiPublicRoutesItemIdPatch
     * @summary Patch
     * @request PATCH:/api/public/routes/{item_id}
     * @secure
     */
    patchApiPublicRoutesItemIdPatch: (
      itemId: number,
      data: RoutePatchSchema,
      params: RequestParams = {},
    ) =>
      this.request<MiniRouteSchema, HTTPValidationError>({
        path: `/api/public/routes/${itemId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public Routes
     * @name UpdateAvatarApiPublicRoutesRouteIdAvatarPost
     * @summary Update Avatar
     * @request POST:/api/public/routes/{route_id}/avatar
     * @secure
     */
    updateAvatarApiPublicRoutesRouteIdAvatarPost: (
      routeId: number,
      data: BodyUpdateAvatarApiPublicRoutesRouteIdAvatarPost,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/public/routes/${routeId}/avatar`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public Routes
     * @name RemovePhotoApiPublicRoutesRouteIdPhotosPhotoIdDeleteDelete
     * @summary Remove Photo
     * @request DELETE:/api/public/routes/{route_id}/photos/{photo_id}/delete
     * @secure
     */
    removePhotoApiPublicRoutesRouteIdPhotosPhotoIdDeleteDelete: (
      routeId: number,
      photoId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/public/routes/${routeId}/photos/${photoId}/delete`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public Routes
     * @name AddPhotosApiPublicRoutesRouteIdPhotosAddPost
     * @summary Add Photos
     * @request POST:/api/public/routes/{route_id}/photos/add
     * @secure
     */
    addPhotosApiPublicRoutesRouteIdPhotosAddPost: (
      routeId: number,
      data: BodyAddPhotosApiPublicRoutesRouteIdPhotosAddPost,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/public/routes/${routeId}/photos/add`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public Routes
     * @name GenerateRouteApiPublicRoutesGenerateSurveyIdPost
     * @summary Generate Route
     * @request POST:/api/public/routes/generate/{survey_id}
     * @secure
     */
    generateRouteApiPublicRoutesGenerateSurveyIdPost: (
      surveyId: number,
      query?: {
        /** @default "Свободный" */
        mode?: RouteGenerationMode;
      },
      params: RequestParams = {},
    ) =>
      this.request<string, HTTPValidationError>({
        path: `/api/public/routes/generate/${surveyId}`,
        method: "POST",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить список моих маршрутов
     *
     * @tags Public Routes
     * @name ListMyRoutesApiPublicRoutesMyGet
     * @summary List My Routes
     * @request GET:/api/public/routes/my
     * @secure
     */
    listMyRoutesApiPublicRoutesMyGet: (
      query?: {
        /**
         * Page
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Page Size
         * @min 1
         * @max 100
         * @default 10
         */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedResponseRouteRead, HTTPValidationError>({
        path: `/api/public/routes/my`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить список моих маршрутов
     *
     * @tags Public Routes
     * @name DeleteMyRouteApiPublicRoutesMyRouteIdDeleteDelete
     * @summary Delete My Route
     * @request DELETE:/api/public/routes/my/{route_id}/delete
     * @secure
     */
    deleteMyRouteApiPublicRoutesMyRouteIdDeleteDelete: (
      routeId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/public/routes/my/${routeId}/delete`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Получить мой маршрут по ID
     *
     * @tags Public Routes
     * @name RetrieveMyRouteApiPublicRoutesMyRouteIdGet
     * @summary Retrieve My Route
     * @request GET:/api/public/routes/my/{route_id}
     * @secure
     */
    retrieveMyRouteApiPublicRoutesMyRouteIdGet: (
      routeId: number,
      params: RequestParams = {},
    ) =>
      this.request<RouteRead, HTTPValidationError>({
        path: `/api/public/routes/my/${routeId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить ленту маршрутов
     *
     * @tags Public Routes
     * @name RoutesFeedApiPublicRoutesFeedGet
     * @summary Routes Feed
     * @request GET:/api/public/routes/feed
     * @secure
     */
    routesFeedApiPublicRoutesFeedGet: (
      query?: {
        /**
         * Page
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Page Size
         * @min 1
         * @max 100
         * @default 10
         */
        page_size?: number;
        /** Name */
        name?: string | null;
        /**
         * City
         * @default "Пермь"
         */
        city?: CityCategory | null;
        /** Type */
        type?: RouteType | null;
        /** Places Count */
        places_count?: number | null;
        /** Places Gte */
        places_gte?: number | null;
        /** Places Lte */
        places_lte?: number | null;
        /** Has Avatar */
        has_avatar?: boolean | null;
        /** Has Photos */
        has_photos?: boolean | null;
        /** Is Custom */
        is_custom?: boolean | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedResponseRouteRead, HTTPValidationError>({
        path: `/api/public/routes/feed`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить маршрут из ленты
     *
     * @tags Public Routes
     * @name RoutesFeedApiPublicRoutesFeedRouteIdGet
     * @summary Routes Feed
     * @request GET:/api/public/routes/feed/{route_id}
     * @secure
     */
    routesFeedApiPublicRoutesFeedRouteIdGet: (
      routeId: number,
      params: RequestParams = {},
    ) =>
      this.request<RouteRead, HTTPValidationError>({
        path: `/api/public/routes/feed/${routeId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public Routes
     * @name CopyRouteApiPublicRoutesCopyRouteIdPost
     * @summary Copy Route
     * @request POST:/api/public/routes/copy/{route_id}
     * @secure
     */
    copyRouteApiPublicRoutesCopyRouteIdPost: (
      routeId: number,
      params: RequestParams = {},
    ) =>
      this.request<RouteRead, HTTPValidationError>({
        path: `/api/public/routes/copy/${routeId}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Эндпоинт для получения анкет пользователя.
     *
     * @tags Public Surveys
     * @name ListSurveysApiPublicSurveysGet
     * @summary List Surveys
     * @request GET:/api/public/surveys
     * @secure
     */
    listSurveysApiPublicSurveysGet: (params: RequestParams = {}) =>
      this.request<SurveyDTO[], any>({
        path: `/api/public/surveys`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Эндпоинт для получения анкет пользователя.
     *
     * @tags Public Surveys
     * @name CreateSurveyApiPublicSurveysPost
     * @summary Create Survey
     * @request POST:/api/public/surveys
     * @secure
     */
    createSurveyApiPublicSurveysPost: (
      data: SurveyCreateDTO,
      params: RequestParams = {},
    ) =>
      this.request<SurveyDTO, HTTPValidationError>({
        path: `/api/public/surveys`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Эндпоинт для получения анкеты пользователя.
     *
     * @tags Public Surveys
     * @name RetrieveSurveyApiPublicSurveysSurveyIdGet
     * @summary Retrieve Survey
     * @request GET:/api/public/surveys/{survey_id}
     * @secure
     */
    retrieveSurveyApiPublicSurveysSurveyIdGet: (
      surveyId: number,
      params: RequestParams = {},
    ) =>
      this.request<SurveyDTO, HTTPValidationError>({
        path: `/api/public/surveys/${surveyId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Эндпоинт для удаления анкеты пользователя.
     *
     * @tags Public Surveys
     * @name DeleteSurveyApiPublicSurveysSurveyIdDelete
     * @summary Delete Survey
     * @request DELETE:/api/public/surveys/{survey_id}
     * @secure
     */
    deleteSurveyApiPublicSurveysSurveyIdDelete: (
      surveyId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/public/surveys/${surveyId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Эндпоинт для редактирования анкеты пользователя.
     *
     * @tags Public Surveys
     * @name UpdateSurveyDataApiPublicSurveysSurveyIdPut
     * @summary Update Survey Data
     * @request PUT:/api/public/surveys/{survey_id}
     * @secure
     */
    updateSurveyDataApiPublicSurveysSurveyIdPut: (
      surveyId: number,
      data: SurveyUpdateDTO,
      params: RequestParams = {},
    ) =>
      this.request<SurveyDTO, HTTPValidationError>({
        path: `/api/public/surveys/${surveyId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить список лайков с пагинацией
     *
     * @tags Public Likes
     * @name ListLikesApiPublicLikesGet
     * @summary List Likes
     * @request GET:/api/public/likes/
     * @secure
     */
    listLikesApiPublicLikesGet: (
      query?: {
        /**
         * Place Id
         * @min 1
         */
        place_id?: number;
        /**
         * Route Id
         * @min 1
         */
        route_id?: number;
        /**
         * Post Id
         * @min 1
         */
        post_id?: number;
        /**
         * Page
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Page Size
         * @min 1
         * @max 100
         * @default 10
         */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedResponseLikeRead, HTTPValidationError>({
        path: `/api/public/likes/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить лайк по ID
     *
     * @tags Public Likes
     * @name RetrieveLikeApiPublicLikesLikeIdGet
     * @summary Retrieve Like
     * @request GET:/api/public/likes/{like_id}
     * @secure
     */
    retrieveLikeApiPublicLikesLikeIdGet: (
      likeId: number,
      params: RequestParams = {},
    ) =>
      this.request<LikeRead, HTTPValidationError>({
        path: `/api/public/likes/${likeId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить лайк
     *
     * @tags Public Likes
     * @name RemoveLikeApiPublicLikesLikeIdDelete
     * @summary Remove Like
     * @request DELETE:/api/public/likes/{like_id}
     * @secure
     */
    removeLikeApiPublicLikesLikeIdDelete: (
      likeId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/public/likes/${likeId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Создать лайк
     *
     * @tags Public Likes
     * @name CreateLikeApiPublicLikesPost
     * @summary Create Like
     * @request POST:/api/public/likes
     * @secure
     */
    createLikeApiPublicLikesPost: (
      data: LikeCreate,
      params: RequestParams = {},
    ) =>
      this.request<LikeRead, HTTPValidationError>({
        path: `/api/public/likes`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить список комментариев с пагинацией
     *
     * @tags Public Comments
     * @name ListCommentApiPublicCommentsGet
     * @summary List Comment
     * @request GET:/api/public/comments/
     * @secure
     */
    listCommentApiPublicCommentsGet: (
      query?: {
        /**
         * Place Id
         * @min 1
         */
        place_id?: number;
        /**
         * Route Id
         * @min 1
         */
        route_id?: number;
        /**
         * Post Id
         * @min 1
         */
        post_id?: number;
        /**
         * Page
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Page Size
         * @min 1
         * @max 100
         * @default 10
         */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedResponseCommentRead, HTTPValidationError>({
        path: `/api/public/comments/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить комментарий по ID
     *
     * @tags Public Comments
     * @name RetrieveCommentApiPublicCommentsCommentIdGet
     * @summary Retrieve Comment
     * @request GET:/api/public/comments/{comment_id}
     * @secure
     */
    retrieveCommentApiPublicCommentsCommentIdGet: (
      commentId: number,
      params: RequestParams = {},
    ) =>
      this.request<CommentRead, HTTPValidationError>({
        path: `/api/public/comments/${commentId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить комментарий
     *
     * @tags Public Comments
     * @name RemoveCommentApiPublicCommentsCommentIdDelete
     * @summary Remove Comment
     * @request DELETE:/api/public/comments/{comment_id}
     * @secure
     */
    removeCommentApiPublicCommentsCommentIdDelete: (
      commentId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/public/comments/${commentId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Обновить текст комментария
     *
     * @tags Public Comments
     * @name EditCommentApiPublicCommentsCommentIdPatch
     * @summary Edit Comment
     * @request PATCH:/api/public/comments/{comment_id}
     * @secure
     */
    editCommentApiPublicCommentsCommentIdPatch: (
      commentId: number,
      data: CommentUpdateDTO,
      params: RequestParams = {},
    ) =>
      this.request<CommentRead, HTTPValidationError>({
        path: `/api/public/comments/${commentId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Создать комментарий
     *
     * @tags Public Comments
     * @name CreateCommentApiPublicCommentsPost
     * @summary Create Comment
     * @request POST:/api/public/comments
     * @secure
     */
    createCommentApiPublicCommentsPost: (
      data: CommentCreate,
      params: RequestParams = {},
    ) =>
      this.request<CommentRead, HTTPValidationError>({
        path: `/api/public/comments`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить список постов
     *
     * @tags Public Post
     * @name ListPostsApiPublicPostsAllGet
     * @summary List Posts
     * @request GET:/api/public/posts/all
     * @secure
     */
    listPostsApiPublicPostsAllGet: (
      query?: {
        /**
         * Page
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Page Size
         * @min 1
         * @max 100
         * @default 10
         */
        page_size?: number;
        /** Title */
        title?: string | null;
        /** Description */
        description?: string | null;
        /** Route Name */
        route_name?: string | null;
        /**
         * City
         * @default "Пермь"
         */
        city?: CityCategory | null;
        /** Type */
        type?: RouteType | null;
        /** Places Count */
        places_count?: number | null;
        /** Places Gte */
        places_gte?: number | null;
        /** Places Lte */
        places_lte?: number | null;
        /** Has Avatar */
        has_avatar?: boolean | null;
        /** Has Photos */
        has_photos?: boolean | null;
        /** Is Custom */
        is_custom?: boolean | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedResponsePostRead, HTTPValidationError>({
        path: `/api/public/posts/all`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить пост по ID
     *
     * @tags Public Post
     * @name RetrievePostApiPublicPostsAllPostIdGet
     * @summary Retrieve Post
     * @request GET:/api/public/posts/all/{post_id}
     * @secure
     */
    retrievePostApiPublicPostsAllPostIdGet: (
      postId: number,
      params: RequestParams = {},
    ) =>
      this.request<PostRead, HTTPValidationError>({
        path: `/api/public/posts/all/${postId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public Post
     * @name CreateApiPublicPostsPost
     * @summary Create
     * @request POST:/api/public/posts/
     * @secure
     */
    createApiPublicPostsPost: (
      data: BodyCreateApiPublicPostsPost,
      params: RequestParams = {},
    ) =>
      this.request<any, HTTPValidationError>({
        path: `/api/public/posts/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public Post
     * @name PatchApiPublicPostsItemIdPatch
     * @summary Patch
     * @request PATCH:/api/public/posts/{item_id}
     * @secure
     */
    patchApiPublicPostsItemIdPatch: (
      itemId: number,
      data: PostPatch,
      params: RequestParams = {},
    ) =>
      this.request<PostRead, HTTPValidationError>({
        path: `/api/public/posts/${itemId}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Public Post
     * @name PutApiPublicPostsItemIdPut
     * @summary Put
     * @request PUT:/api/public/posts/{item_id}
     * @secure
     */
    putApiPublicPostsItemIdPut: (
      itemId: number,
      data: PostPut,
      params: RequestParams = {},
    ) =>
      this.request<PostRead, HTTPValidationError>({
        path: `/api/public/posts/${itemId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить список постов
     *
     * @tags Public Post
     * @name ListMyPostsApiPublicPostsMyGet
     * @summary List My Posts
     * @request GET:/api/public/posts/my
     * @secure
     */
    listMyPostsApiPublicPostsMyGet: (
      query?: {
        /**
         * Page
         * @min 1
         * @default 1
         */
        page?: number;
        /**
         * Page Size
         * @min 1
         * @max 100
         * @default 10
         */
        page_size?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaginatedResponsePostRead, HTTPValidationError>({
        path: `/api/public/posts/my`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить пост по ID
     *
     * @tags Public Post
     * @name RetrieveMyPostApiPublicPostsMyPostIdGet
     * @summary Retrieve My Post
     * @request GET:/api/public/posts/my/{post_id}
     * @secure
     */
    retrieveMyPostApiPublicPostsMyPostIdGet: (
      postId: number,
      params: RequestParams = {},
    ) =>
      this.request<PostRead, HTTPValidationError>({
        path: `/api/public/posts/my/${postId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить пост
     *
     * @tags Public Post
     * @name DeleteMyPostApiPublicPostsMyPostIdDelete
     * @summary Delete My Post
     * @request DELETE:/api/public/posts/my/{post_id}
     * @secure
     */
    deleteMyPostApiPublicPostsMyPostIdDelete: (
      postId: number,
      params: RequestParams = {},
    ) =>
      this.request<void, HTTPValidationError>({
        path: `/api/public/posts/my/${postId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
