import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;

/**
 * @author jmvn-cli
 **/
@TableName(value = "soul", autoResultMap = true)
public class SoulBO implements Serializable {

    private static final long serialVersionUID = 1L;
    
   /**
    * 自增id
    **/
    @TableId(value = "id", type = IdType.ASSIGN_ID)
    public Integer id;
    
   /**
    * 
    **/
    public String title;
    
   /**
    * 
    **/
    public String hits;
    
   
   /**
    * @param id 自增id
    **/
    public void setId(Integer id){
        this.id = id;
    }

   /**
    * @return Integer 自增id
    **/
    public Integer getId(){
        return id
    }
   
   /**
    * @param title 
    **/
    public void setTitle(String title){
        this.title = title;
    }

   /**
    * @return String 
    **/
    public String getTitle(){
        return title
    }
   
   /**
    * @param hits 
    **/
    public void setHits(String hits){
        this.hits = hits;
    }

   /**
    * @return String 
    **/
    public String getHits(){
        return hits
    }
   
    @Override
    public String toString() {
        return "SoulBO{" +
          ",id=" + this.id + 
          ",title=" + this.title + 
          ",hits=" + this.hits + 
        "}"
    }
}
