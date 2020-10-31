module.exports = {
    postgresSetting: {
        connectionSettings: {
            user: 'postgres',
            host: 'localhost',
            database: 'try',
            password: 'Aa123456',
            port: 5432,
        },
        tableSchema: ['id', 'color', 'type', 'geoLocation', 'emptyingDate'],
        queries:{
            GET :{
                '/emptyingDateById':'Select "emptyingDate" FROM  exercise.trashbin WHERE id = $1',
                '/byEmptyingDateRange':'Select id,color,type,,(st_x("geoLocation"::geometry),st_y("geoLocation"::geometry)) as "geoLocation" , "emptyingDate"  FROM  exercise.trashbin WHERE "emptyingDate" BETWEEN $1 AND $2' ,
                '/byEmptyingDate':'Select id,color,type,(st_x("geoLocation"::geometry),st_y("geoLocation"::geometry)) as "geoLocation" , "emptyingDate"  FROM  exercise.trashbin WHERE "emptyingDate" = $1' ,
                '/byDistanceFromPoint':'SELECT id,color,type,,(st_x("geoLocation"::geometry),st_y("geoLocation"::geometry)) as "geoLocation" , "emptyingDate" FROM exercise.trashbin  WHERE ST_DWithin("geoLocation",ST_GeogFromText($1),$2, false);' 
            },
            PUT :{
                '/emptyingDateById':'UPDATE exercise.trashbin SET "emptyingDate" = $1 WHERE id = $2',
                '/locationById':'UPDATE exercise.trashbin SET "geoLocation" = $1 WHERE id = $2'
            },
            POST :{
                '/':'INSERT INTO exercise.trashbin(id, type,color,"geoLocation","emptyingDate") VALUES($1, $2,$3,$4,$5)'
            },
            DELETE :{
                '/':'DELETE FROM exercise.trashbin WHERE id=$1'
            }
        },
    },
        servicePort: 8000
    
}