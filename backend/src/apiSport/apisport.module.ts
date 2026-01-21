import {Module, Global} from '@nestjs/common';
import {ApiSportClient} from "./infrastructure/api/apisport.client";
import {HttpModule} from "@nestjs/axios";

@Global()
@Module({
    imports: [HttpModule],
    providers: [ApiSportClient],
    exports: [ApiSportClient],
})
export class ApiSportModule {}