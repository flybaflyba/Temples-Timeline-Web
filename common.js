

console.log("common.js running")

var temple_image_names = [
"kirtland_temple",
"old_nauvoo_temple",      
"st_george_temple",       
"logan_temple",
"manti_temple",
"salt_lake_temple",       
"laie_hawaii_temple",     
"cardston_alberta_temple",
"mesa_temple",
"idaho_falls_temple",     
"bern_switzerland_temple",
"los_angeles_temple",
"hamilton_new_zealand_temple",
"london_england_temple",
"oakland_temple",
"ogden_utah_temple",
"provo_temple",
"washington_dc_temple",
"sao_paulo_brazil_temple",
"tokyo_japan_temple",
"seattle_temple",
"jordan_river_temple",
"atlanta_temple",
"apia_samoa_temple",
"nukualofa_tonga_temple",
"santiago_chile_temple",
"papeete_tahiti_temple",
"mexico_city_temple",
"boise_idaho_temple",
"sydney_australia_temple",
"manila_philippines_temple",
"dallas_texas_temple",
"taipei_taiwan_temple",
"guatemala_lds_temple",
"freiberg_germany_temple",
"stockholm_sweden_lds_temple",
"chicago_temple",
"johannesburg_south_africa_temple",
"seoul_korea_temple",
"lima_peru_temple",
"buenos_aires_argentina_temple",
"denver_colorado_templ",
"frankfurt_germany_temple",
"portland_oregon_temple",
"las_vegas_temple",
"toronto_temple",
"san_diego_california_temple",
"orlando_temple",
"bountiful_temple",
"hong_kong_china_temple",
"mount_timpanogos_utah_temple",
"st_louis_temple",
"vernal_temple",
"preston_england_temple",
"monticello_utah_temple",
"anchorage_alaska_temple",
"colonia_juarez_mexico_temple",
"madrid_spain_temple",
"bogota_colombia_temple",
"guayaquil_ecuador_temple",
"spokane_washington_temple",
"columbus_ohio_temple",
"bismark_north_dakota_temple",
"columbia_temple",
"detroit_temple",
"halifax_nova_scotia_lds_temple",
"regina_temple",
"billings_montana_temple",
"edmonton_alberta_temple",
"raleigh_north_carolina_temple",
"st_paul_temple",
"kona_temple",
"ciudad_juarez_mexico_temple",
"hermosillo_sonora_mexico_temple",
"albuquerque_temple",
"oaxaca_mexico_temple",
"tuxtla_guitierrez_mexico_temple",
"louisville_temple",
"palmyra_temple",
"fresno_temple",
"medford_temple",
"memphis_tennessee_temple",
"reno_nevada_lds_temple",
"cochabamba_bolivia_temple",
"tampico_mexico_temple",
"nashville_temple",
"villahermosa_mexico_temple",
"montreal_quebec_temple",
"san_jose_costa_rica_temple",
"fukuoka_japan_temple",
"adelaide_australia_temple",
"melbourne_australia_temple",
"suva_fiji_temple",
"merida_mexico_temple",
"veracruz_mexico_temple",
"baton_rouge_louisiana_temple",
"oklahoma_city_temple",
"caracas_venezuela_temple",
"houston_texas_temple",
"birmingham_alabama_temple",
"santo_domingo_dominican_republic_temple",
"boston_temple",
"recife_brazil_temple",
"porto_alegre_brazil_temple",
"montevideo_uruguay_temple",
"winter_quarters_temple",
"guadalajara_temple",
"perth_australia_temple",
"columbia_river_temple",
"snowflake_temple",
"lubbock_temple",
"monterrey_mexico_temple",
"campinas_brazil_temple",
"asuncion_paraguay_temple",
"nauvoo_temple",
"the_hague_netherlands_temple",
"brisbane_australia_temple",
"redlands_temple",
"accra_ghana_temple",
"copenhagen_denmark_temple",
"manhattan_temple",
"san_antonio_temple",
"aba_nigeria_temple",
"newport_beach_california_temple",
"sacramento_temple",
"helsinki_finland_temple",
"rexburg_idaho_temple",
"curitiba_brazil_temple",
"panama_city_temple",
"twin_falls_temple",
"draper_utah_temple",
"oquirrh_mountain_utah_temple",
"vancouver_temple",
"gila_valley_temple",
"cebu_philippines_temple",
"kyiv_ukraine_temple",
"san_salvador_el_salvador_temple",
"quetzaltenango_guatemala_temple",
"kansas_city_temple",
"manaus_brazil_temple",
"brigham_city_utah_temple",
"calgary_alberta_lds_temple",
"tegucigalpa_honduras_temple",
"gilbert_arizona_temple",
"fort_lauderdale_florida_temple",
"phoenix_arizona_temple",
"cordoba_argentina_temple",
"payson_utah_temple",
"trujillo_peru_temple",
"indianapolis_indiana_temple",
"tijuana_mexico_temple",
"provo_city_center_temple",
"sapporo_japan_temple",
"philadelphia_pennsylvania_temple",
"fort_collins_colorado_temple",
"star_valley_wyoming_temple",
"hartford_connecticut_temple",
"paris_france_temple",
"tucson_arizona_temple",
"meridian_idaho_temple",
"cedar_city_utah_temple",
"concepcion_chile_temple",
"barranquilla_columbia_temple",
"rome_italy_temple",
"kinshasa_temple",
"fortaleza_brazil_temple",
"haiti_temple_exterior",
"lisbon_portugal_temple",
"arequipa_peru_temple",
"durban_south_africa_temple",
"winnipeg_manitoba_temple",
"rio_de_janeiro_brazil_temple",
"abidjan_ivory_coast_temple",
"urdaneta_philippines_temple",
"bangkok_thailand_temple",
"pocatello_idaho_temple",
"yigo_guam_temple",
"praia_cape_verde_temple",
"san_juan_puerto_rico_temple",
"quito_ecuador_temple",
"lima_peru_los_olivos_temple",
"belem_brazil_temple",
"saratoga_springs_utah_temple",
"puebla_mexico_temple",
"richmond_virginia_temple",
"layton_utah_temple",
"harare_zimbabwe_temple",
"alabang_philippines_temple",
"brasilia_brazil_temple",
"nairobi_kenya_temple",
"bengaluru_india_temple",
"salta_argentina_temple",
"managua_nicaragua_temple",
"cagayan_de_oro_philippines_temple",
"russia_temple",
"auckland_new_zealand_temple",
"feather_river_california_temple",
"washington_county_utah_temple",
"phnom_penh_cambodia_temple",
"mendoza_argentina_temple",
"salvador_brazil_temple",
"lagos_nigeria_temple",
"davao_philippines_temple",
"tooele_valley_utah_temple",
"moses_lake_washington_temple",
"pago_pago_american_samoa_temple",
"okinawa_city_okinawa_temple",
"neiafu_tonga_temple",
"san_pedro_sula_honduras_temple",
"antofagasta_chile_temple",
"budapest_hungary_temple",
"orem_utah_temple",
"mcallen_texas_temple",
"taylorsville_utah_temple",
"freetown_sierra_leone_temple",
"port_moresby_papua_new_guinea_temple",
"bentonville_arkansas_temple",
"bacolod_philippines_temple",
"coban_guatemala_temple",
"bahia_blanca_argentina_temple",
"tallahassee_florida_temple",
"lubumbashi_democratic_republic_of_the_congo_temple",
"pittsburgh_pennsylvania_temple",
"benin_city_nigeria_temple",
"syracuse_utah_temple",
"dubai_united_arab_emirates_templ"
]


